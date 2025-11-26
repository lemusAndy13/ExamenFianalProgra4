from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Project
		fields = ['id', 'name', 'student_name', 'description', 'status', 'created_at', 'updated_at']


