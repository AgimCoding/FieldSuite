<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'articles')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Order $order = null;

    #[ORM\Column]
    #[Groups(['order:read'])]
    private int $quantity = 1;

    #[ORM\Column(length: 60)]
    #[Groups(['order:read'])]
    private string $unit = 'Pieces';

    #[ORM\Column(length: 100)]
    #[Groups(['order:read'])]
    private string $code;

    #[ORM\Column(length: 255)]
    #[Groups(['order:read'])]
    private string $description;

    public function getId(): ?int { return $this->id; }
    public function getOrder(): ?Order { return $this->order; }
    public function setOrder(?Order $v): static { $this->order = $v; return $this; }
    public function getQuantity(): int { return $this->quantity; }
    public function setQuantity(int $v): static { $this->quantity = $v; return $this; }
    public function getUnit(): string { return $this->unit; }
    public function setUnit(string $v): static { $this->unit = $v; return $this; }
    public function getCode(): string { return $this->code; }
    public function setCode(string $v): static { $this->code = $v; return $this; }
    public function getDescription(): string { return $this->description; }
    public function setDescription(string $v): static { $this->description = $v; return $this; }
}
