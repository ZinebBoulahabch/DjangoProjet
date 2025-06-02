from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

from base.models import Product, Review
from base.serializers import ProductSerializer
from base.filters import ProductFilter


@api_view(['GET'])
def getProducts(request):
    # Restaurer la gestion du paramètre 'keyword' pour la recherche simple
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    # Restaurer le filtrage par nom (était basé sur keyword avant)
    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt') # Restaurer le tri par défaut

    # Le filtrage avancé avec ProductFilter reste en place si vous l'avez ajouté précédemment et souhaitez le garder.
    # Si vous souhaitez également annuler le filtrage avancé, il faudra plus de modifications.
    # Pour l'instant, je vais juste annuler la partie tri manuel et la logique de keyword.
    
    # Pagination (reste inchangé)
    page = request.query_params.get('page', 1)
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    page = int(page)
    
    # Préparer la réponse (reste inchangé)
    serializer = ProductSerializer(products, many=True)
    # Note: Les informations de filtres (categories, brands, price_range) dans la réponse
    # dépendent de si vous annulez aussi la partie filtrage avancé.
    # Si vous voulez tout annuler jusqu'à l'état initial, précisez-le.
    response = {
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages,
        # Restaurer la réponse originale ou garder les infos de filtres si le filtrage avancé est conservé
        # Si vous gardez le filtrage avancé, cette partie de la réponse est correcte.
        'filters': {
            'categories': Product.objects.values_list('category', flat=True).distinct(),
            'brands': Product.objects.values_list('brand', flat=True).distinct(),
            'price_range': {
                'min': Product.objects.order_by('price').first().price if products else 0,
                'max': Product.objects.order_by('-price').first().price if products else 0,
            }
        }
    }
    
    return Response(response)


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
