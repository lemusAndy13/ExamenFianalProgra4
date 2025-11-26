from rest_framework import viewsets
from rest_framework.request import Request
from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
	queryset = Project.objects.all().order_by('-created_at')
	serializer_class = ProjectSerializer

	def get_queryset(self):
		request: Request = self.request
		queryset = super().get_queryset()
		status_param = request.query_params.get('status')
		if status_param:
			queryset = queryset.filter(status=status_param)
		return queryset
