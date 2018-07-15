from django.http import JsonResponse
from rest_framework import status, permissions
from rest_framework.response import Response
from collegeapp.serializers import PostSerializer
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
import random,string
from collegeapp.models import *
from django.core.files.storage import default_storage
from django.utils import timezone
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

def checktype(filename):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return 'image'
    elif filename.lower().endswith(('.mp4', '.3gp')):
        return 'video'
    elif filename.lower().endswith(('.pdf', '.docx', '.rtf', '.txt', '.doc', '.ppt', '.pptx')):
        return 'document'
    elif filename.lower().endswith(('.mp3', '.wav')):
        return 'audio'

    return 'unsopported'


class POST_GP(APIView):
    def get(self, request, *args, **kwargs):
        postdata = POST.objects.values()
        page = request.GET.get('page', 1)
        paginator = Paginator(postdata, 10)
        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)
        print(posts)
        serializer_context = {'request': request}
        serializer = PostSerializer(posts,many=True,context=serializer_context)
        return Response({
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'results': serializer.data
        })
        # return Response(None, status=status.HTTP_201_CREATED)
        # results = PostSerializer(postdata, many=True)
        # return JsonResponse(results.data, safe=False)
    def post(self, request, *args, **kwargs):
        file = request.data.get('content')
        filename = str(file)
        c_type = checktype(filename)
        extension = filename.split(".")[-1]
        new_filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))
        new_filename = request.user.username+new_filename+'.'+extension
        if type is 'unsopported':
            return Response(None, status=status.HTTP_201_CREATED)
        with default_storage.open('DataStore\\'+new_filename, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        url = 'DataStore\\'+new_filename
        req = {}
        req['user']=request.user
        req['content_url'] = url
        req['content_type'] = c_type
        req['post_text'] = request.data.get('post_text')
        req['no_likes'] = 0
        req['created_date'] = timezone.now()
        POST.objects.create(**req)

        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)


        print(c_type,extension,new_filename,request.user)
        return Response(None, status=status.HTTP_201_CREATED)
