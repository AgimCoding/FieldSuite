<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    public function findByFilters(?string $date, ?string $status): array
    {
        $qb = $this->createQueryBuilder('o')
            ->leftJoin('o.articles', 'a')->addSelect('a')
            ->leftJoin('o.objectDetail', 'd')->addSelect('d')
            ->orderBy('o.scheduledAt', 'ASC');

        if ($date) {
            $start = new \DateTimeImmutable($date . ' 00:00:00');
            $end   = new \DateTimeImmutable($date . ' 23:59:59');
            $qb->andWhere('o.scheduledAt BETWEEN :start AND :end')
               ->setParameter('start', $start)
               ->setParameter('end',   $end);
        }

        if ($status) {
            $qb->andWhere('o.status = :status')->setParameter('status', $status);
        }

        return $qb->getQuery()->getResult();
    }
}
