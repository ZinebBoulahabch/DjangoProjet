from django_filters import rest_framework as filters
from .models import Product

class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    category = filters.CharFilter(field_name="category", lookup_expr='iexact')
    brand = filters.CharFilter(field_name="brand", lookup_expr='iexact')
    in_stock = filters.BooleanFilter(field_name="countInStock", lookup_expr='gt')
    min_rating = filters.NumberFilter(field_name="rating", lookup_expr='gte')
    search = filters.CharFilter(method='search_filter')

    class Meta:
        model = Product
        fields = ['category', 'brand', 'min_price', 'max_price', 'in_stock', 'min_rating', 'search']

    def search_filter(self, queryset, name, value):
        return queryset.filter(
            name__icontains=value
        ) | queryset.filter(
            description__icontains=value
        ) | queryset.filter(
            brand__icontains=value
        ) 