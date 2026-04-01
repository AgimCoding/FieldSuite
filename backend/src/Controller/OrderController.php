<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/orders', name: 'api_orders_')]
class OrderController extends AbstractController
{
    public function __construct(
        private OrderRepository        $orderRepository,
        private EntityManagerInterface $em,
        private SerializerInterface    $serializer,
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $date   = $request->query->get('date');
        $status = $request->query->get('status');

        $orders = $this->orderRepository->findByFilters($date, $status);

        $data = $this->serializer->serialize($orders, 'json', ['groups' => ['order:list']]);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'read', methods: ['GET'])]
    public function read(Order $order): JsonResponse
    {
        $data = $this->serializer->serialize($order, 'json', ['groups' => ['order:read']]);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}/status', name: 'update_status', methods: ['PATCH'])]
    public function updateStatus(Order $order, Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);
        $newStatus = $payload['status'] ?? null;

        $allowed = ['pending', 'started', 'done', 'interrupted'];
        if (!in_array($newStatus, $allowed, true)) {
            return $this->json(['error' => 'Invalid status'], Response::HTTP_BAD_REQUEST);
        }

        $order->setStatus($newStatus);
        $this->em->flush();

        return $this->json(['id' => $order->getId(), 'status' => $order->getStatus()]);
    }
}
