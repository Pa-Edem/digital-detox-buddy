// src/constants/spacing.js

/**
 * Константы для отступов и размеров
 * Используются по всему приложению для консистентности
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999, // Для круглых элементов
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

export const iconSize = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

/**
 * Размеры кнопок
 */
export const buttonHeight = {
  sm: 40,
  md: 50,
  lg: 60,
};

/**
 * Минимальная область нажатия для touch targets (44x44 по iOS HIG)
 */
export const minTouchTarget = 44;
