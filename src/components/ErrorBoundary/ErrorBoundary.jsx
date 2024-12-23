import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы отобразить fallback UI в случае ошибки
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку для отладки
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Вы можете кастомизировать fallback UI
      return (
        <div>
          <h1>Что-то пошло не так.</h1>
          <p>Мы уже работаем над этим!</p>
        </div>
      );
    }

    return this.props.children; // Если ошибок нет, рендерим дочерние компоненты
  }
}

export default ErrorBoundary;
