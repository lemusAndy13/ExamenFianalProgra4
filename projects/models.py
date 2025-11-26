from django.db import models


class Project(models.Model):
	name = models.CharField(max_length=150)
	student_name = models.CharField(max_length=100)
	description = models.TextField(blank=True, null=True)

	class Status(models.TextChoices):
		PENDING = 'pending', 'pending'
		IN_REVIEW = 'in_review', 'in_review'
		APPROVED = 'approved', 'approved'

	status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self) -> str:
		return self.name
