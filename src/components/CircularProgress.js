// src/components/CircularProgress.js

import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const CircularProgress = ({ elapsedSeconds = 0, totalSeconds = 1500, size = 300, theme }) => {
  // Конфигурация
  const config = {
    svgSize: size,
    centerX: size / 2,
    centerY: size / 2,
    progressRadius: size * 0.4, // 40% от размера SVG
    dotsRadius: size * 0.47, // 47% от размера SVG (дальше от центра)
    progressStrokeWidth: 8,
    dotSize: 8,
    totalDots: 25,
  };

  // Цвета из темы
  const colors = {
    inactive: theme.text || '#C5C5D0',
    active: theme.accent || '#1B7E5D',
    background: theme.text || '#C5C5D0',
  };

  // Расчет прогресса
  const progress = Math.min(elapsedSeconds / totalSeconds, 1); // 0.0 до 1.0

  // Прогресс в точках: 0.0 (0 точек) до 25.0 (25 точек)
  const progressInDots = progress * config.totalDots;
  const activeDots = Math.ceil(progressInDots);
  // Если прогресс = 0, то активных точек тоже 0
  const activeDotsCount = progress === 0 ? 0 : activeDots;

  // Расчет параметров круга
  const circumference = 2 * Math.PI * config.progressRadius;
  const strokeDashoffset = circumference * (1 - progress);

  // Генерация позиций точек
  const generateDots = () => {
    const dots = [];
    for (let i = 0; i < config.totalDots; i++) {
      // Угол для каждой точки (начинаем сверху = -90°, идем по часовой)
      const angle = (((i * 360) / config.totalDots - 90) * Math.PI) / 180;
      const x = config.centerX + config.dotsRadius * Math.cos(angle);
      const y = config.centerY + config.dotsRadius * Math.sin(angle);

      // Точка активна если линия прогресса дошла до неё
      const isActive = i < activeDotsCount;

      dots.push({
        id: i,
        x,
        y,
        isActive,
      });
    }
    return dots;
  };

  const dots = generateDots();

  // Форматирование времени для текста в центре
  const formatElapsedTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `Прошло ${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `Прошло ${minutes} m`;
    }
    return `Прошло ${seconds} s`;
  };

  return (
    <Svg width={config.svgSize} height={config.svgSize} viewBox={`0 0 ${config.svgSize} ${config.svgSize}`}>
      {/* Фоновый круг (серый, полный) */}
      <Circle
        cx={config.centerX}
        cy={config.centerY}
        r={config.progressRadius}
        stroke={colors.background}
        strokeWidth={config.progressStrokeWidth}
        strokeOpacity={0.3}
        fill='none'
      />

      {/* Активный круг прогресса (розовый, заполняется) */}
      <Circle
        cx={config.centerX}
        cy={config.centerY}
        r={config.progressRadius}
        stroke={colors.active}
        strokeWidth={config.progressStrokeWidth}
        fill='none'
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap='round'
        transform={`rotate(-90 ${config.centerX} ${config.centerY})`}
      />

      {/* Точки */}
      {dots.map((dot) => (
        <Circle
          key={dot.id}
          cx={dot.x}
          cy={dot.y}
          r={config.dotSize}
          fill={dot.isActive ? colors.active : colors.inactive}
          opacity={dot.isActive ? 1 : 0.4}
        />
      ))}

      {/* Текст в центре круга */}
      <SvgText
        x={config.centerX}
        y={config.centerY}
        textAnchor='middle'
        fontSize={18}
        fill={theme.title || '#888888'}
        fontWeight='500'
      >
        {formatElapsedTime(elapsedSeconds)}
      </SvgText>
    </Svg>
  );
};

export default CircularProgress;
