# idealista.history

Historia zmian cen ogłoszeń wynajmu z idealista.pt (Portugalia) i idealista.com (Hiszpania),
zbierana z maili idealista przychodzących na ikark2024@gmail.com.

## Co tu jest

- `rozszerzenie/` – rozszerzenie do Chrome „idealista – historia cen”.
  Na stronach idealista.pt / idealista.com / idealista.it pokazuje przy cenie historię zmian:
  - z maili (pobierane z arkusza Google „idealista – historia cen (dla rozszerzenia)”),
  - oraz zmiany, które rozszerzenie samo zauważy podczas przeglądania (zapisywane lokalnie w przeglądarce).
- `dane/historia-cen-2026.csv` – stan historii zmian cen na 19.11.2026 (81 zmian, 51 ogłoszeń).

## Instalacja rozszerzenia – krok po kroku

Rozszerzenie działa w Google Chrome na komputerze (Windows lub Mac). Działa też w Microsoft Edge
i Brave – kroki są te same, zmienia się tylko adres strony rozszerzeń (podany niżej).
Nie działa na telefonie.

W nawiasach podane są angielskie nazwy przycisków – na wypadek, gdyby Chrome był po angielsku.

### Krok 1. Pobierz pliki z GitHuba

1. Otwórz stronę repozytorium: https://github.com/ireneuszkrak-sys/idealista.history
   (repozytorium jest prywatne – musisz być zalogowana na GitHubie na konto `ireneuszkrak-sys`).
2. Kliknij zielony przycisk **Code** (nad listą plików, po prawej).
3. W okienku, które się rozwinie, kliknij **Download ZIP** (na samym dole).
4. Przeglądarka pobierze plik `idealista.history-main.zip` – zwykle do folderu **Pobrane** (Downloads).

### Krok 2. Rozpakuj plik i odłóż folder w stałe miejsce

1. Otwórz folder **Pobrane**.
2. Rozpakuj `idealista.history-main.zip`:
   - **Windows**: kliknij plik prawym przyciskiem myszy → **Wyodrębnij wszystkie…** (Extract All…) → **Wyodrębnij**.
   - **Mac**: kliknij plik dwa razy – obok pojawi się rozpakowany folder.
3. Powstanie folder `idealista.history-main`, a w nim folder **`rozszerzenie`**.
4. Przenieś folder `idealista.history-main` w miejsce, w którym zostanie na stałe,
   np. do **Dokumenty**. Ważne: **nie usuwaj tego folderu po instalacji** – Chrome uruchamia
   rozszerzenie prosto z niego. Jeśli folder zniknie, rozszerzenie przestanie działać.

### Krok 3. Włącz tryb dewelopera w Chrome

1. Otwórz Chrome.
2. W pasku adresu wpisz `chrome://extensions` i naciśnij Enter
   (Edge: `edge://extensions`, Brave: `brave://extensions`).
   Możesz też wejść przez menu ⋮ (trzy kropki w prawym górnym rogu) → **Rozszerzenia** → **Zarządzaj rozszerzeniami**.
3. W prawym górnym rogu tej strony włącz przełącznik **Tryb dewelopera** (Developer mode).
   Pojawi się nowy pasek z przyciskami.

### Krok 4. Załaduj rozszerzenie

1. Kliknij przycisk **Załaduj rozpakowane** (Load unpacked) – po lewej, na nowym pasku.
2. W oknie wyboru folderu przejdź do `idealista.history-main` i zaznacz folder **`rozszerzenie`**
   (sam folder – nie wchodź do środka i nie wybieraj pojedynczych plików).
3. Kliknij **Wybierz folder** (Select Folder / na Macu **Otwórz**).
4. Na liście rozszerzeń pojawi się kafelek **„idealista – historia cen” 1.0** z włączonym przełącznikiem.
   Jeśli pojawi się czerwony przycisk **Błędy** (Errors) – patrz „Rozwiązywanie problemów” niżej.

### Krok 5. Przypnij ikonę do paska

1. Kliknij ikonę **puzzla** 🧩 w prawym górnym rogu Chrome (obok paska adresu).
2. Przy „idealista – historia cen” kliknij **pinezkę** 📌.
3. Ikona rozszerzenia (szary kwadrat z literą „i”) zostanie na stałe na pasku.

### Krok 6. Daj rozszerzeniu dostęp do historii z maili

Historia cen z maili jest w arkuszu Google **„idealista – historia cen (dla rozszerzenia)”**
na Dysku Google konta `ireneusz.krak@gmail.com`
(ID: `1JSF0bKdFVMh04XTZiUHP6tuO6o0zhiWsZSWX0Dw0oD0`). Rozszerzenie pobiera go automatycznie,
ale tylko wtedy, gdy ma do niego dostęp. Wybierz **jedną** z dwóch możliwości:

- **Możliwość A – logowanie w Chrome (bez udostępniania):**
  w tym samym Chrome zaloguj się do Google na konto `ireneusz.krak@gmail.com`
  (np. wejdź na https://drive.google.com i zaloguj się). Wystarczy, że to konto jest zalogowane w przeglądarce.
- **Możliwość B – udostępnienie przez link:**
  1. Wejdź na https://drive.google.com (jako `ireneusz.krak@gmail.com`) i otwórz arkusz
     „idealista – historia cen (dla rozszerzenia)”.
  2. Kliknij **Udostępnij** (Share) w prawym górnym rogu.
  3. W części **Dostęp ogólny** (General access) zmień „Z ograniczeniami” na
     **„Każda osoba mająca link”** (Anyone with the link), rola: **Przeglądający** (Viewer).
  4. Kliknij **Gotowe**.
  Uwaga: wtedy każdy, kto zna link, może zobaczyć listę cen i adresów ogłoszeń.

### Krok 7. Sprawdź, czy działa

1. Kliknij ikonę rozszerzenia na pasku → **Odśwież teraz**.
2. Powinno się pokazać m.in. **„Ogłoszenia ze zmianami (z maili): 51”** (albo więcej) i data ostatniego pobrania.
   Czerwony komunikat „Nie udało się pobrać historii z maili” oznacza brak dostępu – wróć do kroku 6.
3. Otwórz ogłoszenie, którego cena się zmieniała, np.
   https://www.idealista.pt/imovel/35275156/ lub https://www.idealista.com/inmueble/111950609/
   Pod ceną powinna pojawić się ramka **„Historia ceny”** z listą zmian.
4. Na liście wyników wyszukiwania przy cenach ogłoszeń ze zmianami pojawi się mały znaczek,
   np. „↓ −11,4% od 1 750 € · 1 zm. · ost. 18.11.2026”. Najedź na niego myszką, żeby zobaczyć całą historię.
   Zielony kolor = cena spadła, czerwony = wzrosła.

## Co pokazuje rozszerzenie

- **zmiany z maili** (oznaczone „mail”) – z arkusza Google, odświeżane automatycznie co 3 godziny
  (albo od razu przyciskiem **Odśwież teraz**);
- **zmiany zauważone na stronie** (oznaczone „strona”) – rozszerzenie zapamiętuje cenę każdego
  ogłoszenia, które oglądasz (na liście wyników albo na stronie ogłoszenia). Jeśli przy kolejnej
  wizycie cena jest inna, dopisuje zmianę. Te dane są zapisane tylko w Twojej przeglądarce
  i nigdzie nie są wysyłane.

## Aktualizacja rozszerzenia do nowej wersji

1. Pobierz ZIP z GitHuba jeszcze raz (krok 1) i rozpakuj.
2. Podmień zawartość starego folderu `rozszerzenie` na nową (w tym samym miejscu na dysku).
3. Wejdź na `chrome://extensions` i na kafelku „idealista – historia cen” kliknij ikonę
   **odświeżania** ⟳. Zapamiętane ceny ze stron zostają.

## Rozwiązywanie problemów

- **Nie widzę ramki ani znaczków na idealista** – odśwież stronę idealista (F5). Sprawdź na
  `chrome://extensions`, czy przełącznik rozszerzenia jest włączony. Jeśli dalej nic –
  idealista mógł zmienić wygląd strony; zgłoś to, rozszerzenie trzeba będzie poprawić.
- **Ramka mówi „Brak zmian ceny w mailach”** – dla tego ogłoszenia nie było maila o zmianie ceny.
  To normalne.
- **Czerwony komunikat w okienku rozszerzenia** – brak dostępu do arkusza Google (krok 6).
- **Chrome przy starcie pokazuje ostrzeżenie o rozszerzeniach w trybie dewelopera** – to normalne
  dla rozszerzeń instalowanych spoza sklepu Chrome. Kliknij, żeby zamknąć (nie wyłączaj rozszerzenia).
- **Przycisk „Błędy” przy rozszerzeniu** – upewnij się, że w kroku 4 wskazany był folder
  `rozszerzenie` (w którym leży plik `manifest.json`), a nie folder nadrzędny.

## Odinstalowanie

`chrome://extensions` → na kafelku „idealista – historia cen” kliknij **Usuń** (Remove).
Potem możesz skasować folder `idealista.history-main`.

## Codzienna aktualizacja

Zadanie zaplanowane w Claude („Historia cen idealista”, codziennie ok. 4:39) przegląda nowe maile idealista,
dopisuje ogłoszenia i zmiany cen do arkusza Claude „Historia zmian cen – ogłoszenia idealista”
i dopisuje nowe zmiany do arkusza Google, z którego korzysta rozszerzenie.
