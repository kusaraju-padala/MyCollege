from rest_framework import generics
from rest_framework.serializers import ModelSerializer
from collegeapp.models import POST

class PostSerializer(ModelSerializer):
    class Meta:
        model = POST
        exclude = ['user']

    def create(self, validated_data,**kwargs):
        print("Entered Serializer")
        return POST.objects.create(**validated_data)
