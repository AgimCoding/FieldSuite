<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:list', 'order:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 60)]
    #[Groups(['order:list', 'order:read'])]
    private string $orderId;

    #[ORM\Column(length: 60, nullable: true)]
    #[Groups(['order:list', 'order:read'])]
    private ?string $jobNr = null;

    #[ORM\Column(length: 60, nullable: true)]
    #[Groups(['order:list', 'order:read'])]
    private ?string $objectId = null;

    #[ORM\Column(length: 255)]
    #[Groups(['order:list', 'order:read'])]
    private string $company;

    #[ORM\Column(length: 255)]
    #[Groups(['order:list', 'order:read'])]
    private string $location;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:list', 'order:read'])]
    private ?string $equipmentCode = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:list', 'order:read'])]
    private ?string $subject = null;

    #[ORM\Column(length: 60)]
    #[Groups(['order:list', 'order:read'])]
    private string $status = 'pending';

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:list', 'order:read'])]
    private ?string $orderType = null;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['order:list', 'order:read'])]
    private \DateTimeImmutable $scheduledAt;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['order:list', 'order:read'])]
    private \DateTimeImmutable $scheduledEnd;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $contact = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $address = null;

    #[ORM\Column(length: 60, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $phone = null;

    #[ORM\Column]
    #[Groups(['order:read'])]
    private bool $smsAllowed = false;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['order:read'])]
    private ?string $email = null;

    #[ORM\OneToMany(targetEntity: Article::class, mappedBy: 'order', cascade: ['persist', 'remove'])]
    #[Groups(['order:read'])]
    private Collection $articles;

    #[ORM\OneToOne(targetEntity: ObjectDetail::class, cascade: ['persist', 'remove'])]
    #[Groups(['order:read'])]
    private ?ObjectDetail $objectDetail = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int { return $this->id; }
    public function getOrderId(): string { return $this->orderId; }
    public function setOrderId(string $v): static { $this->orderId = $v; return $this; }
    public function getJobNr(): ?string { return $this->jobNr; }
    public function setJobNr(?string $v): static { $this->jobNr = $v; return $this; }
    public function getObjectId(): ?string { return $this->objectId; }
    public function setObjectId(?string $v): static { $this->objectId = $v; return $this; }
    public function getCompany(): string { return $this->company; }
    public function setCompany(string $v): static { $this->company = $v; return $this; }
    public function getLocation(): string { return $this->location; }
    public function setLocation(string $v): static { $this->location = $v; return $this; }
    public function getEquipmentCode(): ?string { return $this->equipmentCode; }
    public function setEquipmentCode(?string $v): static { $this->equipmentCode = $v; return $this; }
    public function getSubject(): ?string { return $this->subject; }
    public function setSubject(?string $v): static { $this->subject = $v; return $this; }
    public function getStatus(): string { return $this->status; }
    public function setStatus(string $v): static { $this->status = $v; return $this; }
    public function getOrderType(): ?string { return $this->orderType; }
    public function setOrderType(?string $v): static { $this->orderType = $v; return $this; }
    public function getScheduledAt(): \DateTimeImmutable { return $this->scheduledAt; }
    public function setScheduledAt(\DateTimeImmutable $v): static { $this->scheduledAt = $v; return $this; }
    public function getScheduledEnd(): \DateTimeImmutable { return $this->scheduledEnd; }
    public function setScheduledEnd(\DateTimeImmutable $v): static { $this->scheduledEnd = $v; return $this; }
    public function getContact(): ?string { return $this->contact; }
    public function setContact(?string $v): static { $this->contact = $v; return $this; }
    public function getAddress(): ?string { return $this->address; }
    public function setAddress(?string $v): static { $this->address = $v; return $this; }
    public function getPhone(): ?string { return $this->phone; }
    public function setPhone(?string $v): static { $this->phone = $v; return $this; }
    public function isSmsAllowed(): bool { return $this->smsAllowed; }
    public function setSmsAllowed(bool $v): static { $this->smsAllowed = $v; return $this; }
    public function getEmail(): ?string { return $this->email; }
    public function setEmail(?string $v): static { $this->email = $v; return $this; }
    public function getArticles(): Collection { return $this->articles; }
    public function addArticle(Article $a): static { if (!$this->articles->contains($a)) { $this->articles->add($a); $a->setOrder($this); } return $this; }
    public function removeArticle(Article $a): static { if ($this->articles->removeElement($a)) { if ($a->getOrder() === $this) { $a->setOrder(null); } } return $this; }
    public function getObjectDetail(): ?ObjectDetail { return $this->objectDetail; }
    public function setObjectDetail(?ObjectDetail $v): static { $this->objectDetail = $v; return $this; }
}
