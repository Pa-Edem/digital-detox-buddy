// src/screens/HomeScreen.js

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSessionContext } from '../contexts/SessionContext';

const HomeScreen = ({ navigation }) => {
  // Деструктурируем данные и методы из хука useSession
  // Хук возвращает объект, и мы извлекаем из него только то что нам нужно на этом экране
  const { sessionStatus, startSession } = useSessionContext();

  // Функция которая вызывается когда пользователь нажимает на кнопку выбора длительности
  // Она принимает длительность в минутах, конвертирует в секунды, и запускает сессию
  const handleStartSession = (minutes) => {
    // Конвертируем минуты в секунды умножая на 60
    const seconds = minutes * 60;

    // Вызываем функцию запуска сессии из хука передавая длительность в секундах
    startSession(seconds);

    // Автоматически переключаем пользователя на экран активной сессии
    // navigation это проп который React Navigation автоматически передает всем экранам
    // Метод navigate позволяет перейти на другой экран по его имени
    navigation.navigate('Session');
  };

  return (
    <View style={styles.container}>
      {/* Заголовок приложения */}
      <Text style={styles.title}>Digital Detox Buddy</Text>

      {/* Подзаголовок с инструкцией */}
      <Text style={styles.subtitle}>Выберите длительность сессии фокуса</Text>

      {/* Контейнер для кнопок выбора длительности */}
      <View style={styles.durationContainer}>
        {/* Кнопка для короткой 5-минутной сессии */}
        {/* TouchableOpacity это компонент кнопки который реагирует на нажатия */}
        {/* При нажатии он слегка изменяет прозрачность создавая визуальную обратную связь */}
        <TouchableOpacity style={styles.durationButton} onPress={() => handleStartSession(5)}>
          <Text style={styles.durationText}>5 мин</Text>
          <Text style={styles.durationHint}>Быстрый фокус</Text>
        </TouchableOpacity>

        {/* Кнопка для стандартной 25-минутной сессии по технике Помодоро */}
        {/* Эта кнопка имеет дополнительный стиль primary чтобы выделить её как рекомендуемую */}
        <TouchableOpacity style={[styles.durationButton, styles.primaryButton]} onPress={() => handleStartSession(25)}>
          <Text style={[styles.durationText, styles.primaryText]}>25 мин</Text>
          <Text style={[styles.durationHint, styles.primaryText]}>Помодоро</Text>
        </TouchableOpacity>

        {/* Кнопка для длинной 50-минутной сессии глубокой работы */}
        <TouchableOpacity style={styles.durationButton} onPress={() => handleStartSession(50)}>
          <Text style={styles.durationText}>50 мин</Text>
          <Text style={styles.durationHint}>Глубокая работа</Text>
        </TouchableOpacity>
      </View>

      {/* Показываем текущий статус сессии для отладки */}
      {/* В финальной версии это можно убрать, но пока это помогает видеть что происходит */}
      <Text style={styles.statusText}>Статус: {sessionStatus}</Text>
    </View>
  );
};

// Создаем объект стилей используя StyleSheet.create
// StyleSheet.create оптимизирует стили для лучшей производительности
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // padding добавляет внутренние отступы со всех сторон
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    // textAlign center выравнивает текст по центру по горизонтали
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 40,
    textAlign: 'center',
  },
  durationContainer: {
    // flexDirection row размещает дочерние элементы горизонтально в ряд
    flexDirection: 'row',
    // justifyContent space-around распределяет элементы равномерно с пространством вокруг
    justifyContent: 'space-around',
    // width 100% означает что контейнер займет всю доступную ширину
    width: '100%',
    marginBottom: 30,
  },
  durationButton: {
    // Кнопка имеет фиксированную ширину и высоту
    width: 100,
    height: 100,
    // backgroundColor это цвет фона кнопки
    backgroundColor: '#ECF0F1',
    // borderRadius скругляет углы создавая круглую кнопку
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation добавляет тень на Android создавая эффект приподнятости
    elevation: 3,
    // shadowColor shadowOffset shadowOpacity и shadowRadius создают тень на iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButton: {
    // Основная кнопка выделена синим цветом чтобы привлечь внимание
    backgroundColor: '#3498DB',
  },
  durationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  primaryText: {
    // Текст на основной кнопке белый для контраста с синим фоном
    color: '#FFFFFF',
  },
  durationHint: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 20,
  },
});

// Экспортируем компонент чтобы его можно было импортировать в других файлах
export default HomeScreen;
