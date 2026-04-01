<?php

namespace App\Entity;

use App\Repository\ObjectDetailRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ObjectDetailRepository::class)]
class ObjectDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 60, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $code = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $localisation = null;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $barcode = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $description = null;

    public function getId(): ?int { return $this->id; }
    public function getCode(): ?string { return $this->code; }
    public function setCode(?string $v): static { $this->code = $v; return $this; }
    public function getName(): ?string { return $this->name; }
    public function setName(?string $v): static { $this->name = $v; return $this; }
    public function getLocalisation(): ?string { return $this->localisation; }
    public function setLocalisation(?string $v): static { $this->localisation = $v; return $this; }
    public function getBarcode(): ?string { return $this->barcode; }
    public function setBarcode(?string $v): static { $this->barcode = $v; return $this; }
    public function getDescription(): ?string { return $this->description; }
    public function setDescription(?string $v): static { $this->description = $v; return $this; }
}
