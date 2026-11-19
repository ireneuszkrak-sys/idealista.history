# idealista.history

Historia zmian cen ogłoszeń wynajmu z idealista.pt (Portugalia) i idealista.com (Hiszpania),
zbierana z maili idealista przychodzących na ikark2024@gmail.com.

## Co tu jest

- `rozszerzenie/` – rozszerzenie do Chrome „idealista – historia cen”.
  Na stronach idealista.pt / idealista.com / idealista.it pokazuje przy cenie historię zmian:
  - z maili (pobierane z arkusza Google „idealista – historia cen (dla rozszerzenia)”),
  - oraz zmiany, które rozszerzenie samo zauważy podczas przeglądania (zapisywane lokalnie w przeglądarce).
- `dane/historia-cen-2026.csv` – stan historii zmian cen na 19.11.2026 (81 zmian, 51 ogłoszeń).

## Instalacja rozszerzenia

1. Pobierz to repozytorium (Code → Download ZIP) i rozpakuj.
2. W Chrome otwórz `chrome://extensions`.
3. Włącz **Tryb dewelopera** (prawy górny róg).
4. Kliknij **Załaduj rozpakowane** i wskaż folder `rozszerzenie`.
5. Przypnij ikonę rozszerzenia i kliknij **Odśwież teraz**.

Rozszerzenie czyta arkusz Google o ID `1JSF0bKdFVMh04XTZiUHP6tuO6o0zhiWsZSWX0Dw0oD0`
(eksport CSV). Działa, jeśli w Chrome jesteś zalogowana na konto, które ma dostęp do arkusza,
albo arkusz jest udostępniony „każdemu, kto ma link”.

## Codzienna aktualizacja

Zadanie zaplanowane w Claude („Historia cen idealista”, codziennie ok. 4:39) przegląda nowe maile idealista,
dopisuje ogłoszenia i zmiany cen do arkusza Claude „Historia zmian cen – ogłoszenia idealista”
i dopisuje nowe zmiany do arkusza Google, z którego korzysta rozszerzenie.
