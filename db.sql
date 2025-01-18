-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-01-2025 a las 00:38:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemapt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `Nombre`, `Descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Alimentos', NULL, '2024-10-09 10:47:56', '2024-10-09 10:47:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Telefono` varchar(255) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `Nombre`, `Email`, `Telefono`, `Direccion`, `created_at`, `updated_at`) VALUES
(1, 'yermi', 'yermi@correo.com', '923886920', 'Lima', '2024-10-09 10:48:44', '2024-10-09 10:48:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `PrecioUnitario` decimal(10,2) NOT NULL,
  `Total` decimal(10,2) NOT NULL,
  `IdPedido` bigint(20) UNSIGNED NOT NULL,
  `IdProducto` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id`, `Cantidad`, `PrecioUnitario`, `Total`, `IdPedido`, `IdProducto`, `created_at`, `updated_at`) VALUES
(1, 2, 15.60, 31.20, 1, 1, '2024-10-09 10:49:55', '2024-10-09 10:49:55'),
(2, 3, 15.60, 46.80, 2, 1, '2024-10-14 07:49:15', '2024-10-14 07:49:15'),
(3, 3, 13.90, 41.70, 3, 2, '2025-01-04 19:39:23', '2025-01-04 19:39:23'),
(4, 1, 13.90, 13.90, 4, 2, '2025-01-19 04:26:52', '2025-01-19 04:26:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`id`, `Nombre`, `created_at`, `updated_at`) VALUES
(1, 'Targeta', '2024-10-09 10:47:43', '2024-10-09 10:47:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(10, '0001_01_01_000000_create_users_table', 1),
(11, '2024_04_07_030411_create_personal_access_tokens_table', 1),
(12, '2024_10_06_062804_create_categoria_table', 1),
(13, '2024_10_06_235159_create_sub_categoria_table', 1),
(14, '2024_10_06_242925_create_producto_table', 1),
(15, '2024_10_07_021514_create_metodo_pago_table', 1),
(16, '2024_10_07_021515_create_cliente_table', 1),
(17, '2024_10_07_104533_create_pedido_table', 1),
(18, '2024_10_07_104955_create_detalle_pedido_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `SubTotal` decimal(8,2) NOT NULL,
  `Impuesto` decimal(8,2) NOT NULL,
  `Total` decimal(8,2) NOT NULL,
  `Estado` varchar(255) NOT NULL,
  `IdMetodoPago` bigint(20) UNSIGNED NOT NULL,
  `IdCliente` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `SubTotal`, `Impuesto`, `Total`, `Estado`, `IdMetodoPago`, `IdCliente`, `created_at`, `updated_at`) VALUES
(1, 31.20, 5.62, 36.82, 'FINALIZED', 1, 1, '2024-10-09 10:49:55', '2024-10-09 10:49:55'),
(2, 46.80, 8.42, 55.22, 'FINALIZED', 1, 1, '2024-10-14 07:49:15', '2024-10-14 07:49:15'),
(3, 41.70, 7.51, 49.21, 'FINALIZED', 1, 1, '2025-01-04 19:39:23', '2025-01-04 19:39:23'),
(4, 13.90, 2.50, 16.40, 'FINALIZED', 1, 1, '2025-01-19 04:26:52', '2025-01-19 04:26:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'auth_token', 'fbda8a8c441b3089c0c2524fda449396b4575d114f3602db56eaa840068999c4', '[\"*\"]', '2024-10-09 10:50:41', NULL, '2024-10-09 10:46:50', '2024-10-09 10:50:41'),
(3, 'App\\Models\\User', 2, 'auth_token', '3a8100c0428cd20001be2f303a92fe411434c78364d0493cbaabd6c74cbc3d52', '[\"*\"]', '2024-10-14 07:51:05', NULL, '2024-10-14 07:46:50', '2024-10-14 07:51:05'),
(5, 'App\\Models\\User', 3, 'auth_token', '6f27f367cfcaa36710ebb5a2b351f64acba230c9ece9b923ffbcac61310029ca', '[\"*\"]', '2025-01-19 04:34:30', NULL, '2025-01-19 04:25:48', '2025-01-19 04:34:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL DEFAULT 0,
  `Photo` text DEFAULT NULL,
  `IdCategoria` bigint(20) UNSIGNED NOT NULL,
  `IdSubCategoria` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `Nombre`, `Descripcion`, `Precio`, `Stock`, `Photo`, `IdCategoria`, `IdSubCategoria`, `created_at`, `updated_at`) VALUES
(1, 'Manzanas', 'roja', 15.60, 0, 'images/cnbdDKRbfhBAgdrQm1zWPvqWKALrw7KFlxCyxaM2.png', 1, 1, '2024-10-09 10:49:11', '2024-10-14 07:50:17'),
(2, 'Pera', 'pera', 13.90, 96, NULL, 1, 1, '2025-01-04 19:38:25', '2025-01-19 04:26:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sub_categoria`
--

CREATE TABLE `sub_categoria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `IdCategoria` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sub_categoria`
--

INSERT INTO `sub_categoria` (`id`, `Nombre`, `Descripcion`, `IdCategoria`, `created_at`, `updated_at`) VALUES
(1, 'frutas', NULL, 1, '2024-10-09 10:48:18', '2024-10-09 10:48:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'josue', 'josue9688', '$2y$12$OstOrUqEGZaVuYQSNHT3TOCtmmG96/LMazKpK9S5beDIIE1siMsay'),
(2, 'Valeria', 'valeria@gmail.com', '$2y$12$0INdZ7Mh4OyBwb8WBBhF7.Ll5GJkFivA/4pWnQmQ8EAh8Y7NwrN6a'),
(3, 'yermi', 'yermi', '$2y$12$eSLUbtpv0cAHiSc.rLjOSuEs4XpmigA79eTBCoSTJsZGwvcRVScBi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categoria_nombre_unique` (`Nombre`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cliente_email_unique` (`Email`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detalle_pedido_idpedido_foreign` (`IdPedido`),
  ADD KEY `detalle_pedido_idproducto_foreign` (`IdProducto`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_idcliente_foreign` (`IdCliente`),
  ADD KEY `pedido_idmetodopago_foreign` (`IdMetodoPago`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_idcategoria_foreign` (`IdCategoria`),
  ADD KEY `producto_idsubcategoria_foreign` (`IdSubCategoria`);

--
-- Indices de la tabla `sub_categoria`
--
ALTER TABLE `sub_categoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_categoria_idcategoria_foreign` (`IdCategoria`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sub_categoria`
--
ALTER TABLE `sub_categoria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_idpedido_foreign` FOREIGN KEY (`IdPedido`) REFERENCES `pedido` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_pedido_idproducto_foreign` FOREIGN KEY (`IdProducto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_idcliente_foreign` FOREIGN KEY (`IdCliente`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `pedido_idmetodopago_foreign` FOREIGN KEY (`IdMetodoPago`) REFERENCES `metodo_pago` (`id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_idcategoria_foreign` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `producto_idsubcategoria_foreign` FOREIGN KEY (`IdSubCategoria`) REFERENCES `sub_categoria` (`id`);

--
-- Filtros para la tabla `sub_categoria`
--
ALTER TABLE `sub_categoria`
  ADD CONSTRAINT `sub_categoria_idcategoria_foreign` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
