FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    git curl unzip libzip-dev icu-dev oniguruma-dev \
    && docker-php-ext-install pdo_mysql zip intl mbstring opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-interaction --prefer-dist --optimize-autoloader 2>/dev/null || true

RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000
CMD ["php-fpm"]
