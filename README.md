## Spis treści
* [🍻 Tytuł](#-tytuł)
* [✉️ Opis projektu](#️-opis-projektu)
* [📚 Funkcjonalności](#-funkcjonalności)
* [🔗 Zastosowane technologie](#-zastosowane-technologie)
* [🖥️ Instrukcja instalacji](#️-instrukcja-instalacji)
* [👥 Zespół](#-zespół)
---
## 🍻 Tytuł
**Piwo z Łosiem** 🍻
<p align="center">
    <img src="https://i.imgur.com/xBaIsHZ.png" alt="piwo z losiem" width="200"/>
</p>

---
## ✉️ Opis projektu

Projekt Piwo z Łosiem jest aplikacją służącą do znajdowania innych użytkowników chętnych na wspólne wyjście na browara. Aplikacja ta ma ułatwiać ludziom zawiązywanie nowych znajomości, podczas wspólnego wypadu na piwo do pobliskiego baru. Piwo z Łosiem pozwala użytkownikom szukać innych dostępnych użytkowników na mapie i proponować im wspólne wyjście. Jeżeli się z kimś zaprzyjaźnisz, możesz dodać go do znajomych i chatować do woli. Jeżeli lubisz poczuć odrobinę rywalizacji, mamy coś dla Ciebie. W aplikacji znajduje się system rankingu w którym możesz sprawdzić swoje miejsce pod względem wypitych piw w ciągu danego: tygodnia, miesiąca lub od samego początku.

---
## 📚 Funkcjonalności

- Logowanie oraz rejestracja w serwisie,
- Dodawanie znajomych,
- Edytowanie swojego statusu aktywności,
- Szukanie ludzi chętnych na wyjście na piwo z pomocą mapy ludzi w pobliżu,
- Chatowanie z innymi użytkownikami,
- Edycja swojego profilu oraz preferencji (wraz ze zdjęciem profilowym),
- Przeglądanie i rywalizowanie w rankingu wypitych piw z innymi użytkownikami,
- Zdobywanie odznak za różne osiągnięcia.

---
## 🔗 Zastosowane technologie
- Vue.js
- Tailwind
- Node.js
- Express.js
- MongoDB

---
## 🖥️ Instrukcja instalacji
```bash
git clone https://github.com/MateuszWPL/PiwoZLosiem.git

# Należy wejść w folder backend i stworzyć plik .env 
# Utworzyć w nim następujące zmienne:
# MONGO_URI=
# JWT_SECRET=
# MAILTRAP_HOST=
# MAILTRAP_PORT=
# MAILTRAP_USER=
# MAILTRAP_PASS=
# FRONTEND_URL=
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=

# Następnie uruchamiamy w folderze backend konsolę i wykonujemy:
npm install
npm run dev

# Otwieramy folder frontend, otwieramy w nim konsolę i wykonujemy:
npm install
npm run dev

# W razie błędów npm należy doinstalować brakujące moduły 
npm install [brakujący_pakiet]
```

---
## 👥 Zespół
* [Kacper Mróz](https://github.com/bboychlodny)
* [Łukasz Kucikowicz](https://github.com/lukasz1231)
* [Marcin Kosiński](https://github.com/mkosinskki)
* [Mateusz Woronowicz](https://github.com/MateuszWPL)
* [Miłosz Sidor](https://github.com/Mainloo)
* [Patryk Czech](https://github.com/pamix00)
