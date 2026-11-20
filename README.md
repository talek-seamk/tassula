# Tassula ry – Kotia odottavat eläimet

Web-ohjelmoinnin harjoitustöinä toteutettu sivusto kuvitteelliselle Tassula ry:lle. Sivusto esittelee kotia etsiviä eläimiä ja adoption vaiheita. Tekoälyä (Copilot ja Claude) on käytetty suunnitteluun, toteutukseen ja korjauksiin, ja käyttö on kirjattu tarkemmin ai-log.md-tiedostoon.

## Sivut ja toiminnot

- index.html – sivuston esittely ja kolme pisimpään kotia odottanutta eläintä.
- about.html – yhdistyksen esittely ja adoption vaiheet.
- listing.html – eläinten suodatus (kissat, koirat ja muut) ja järjestysvalikko (pisimpään odottaneet ensin tai nimen mukaan). Tilarivi kertoo, montako eläintä näytetään. Adoptoidut eläimet piilotetaan.
- contact.html – adoptiokyselyn tarkistus ja yhteenveto. Keskeneräinen kysely tallentuu selaimeen, ja lomakkeen voi tyhjentää.

Eläintiedot ovat app.js-tiedoston alussa. Adoptoidun eläimen status muutetaan arvoon "adopted". Eläimet ovat esimerkkejä ja kuvat kuvituskuvia. Kuvien lähteet ja käyttöehdot ovat KUVAT.txt-tiedostossa.

## Ulkoasu

Kaikki sivut käyttävät yhtä style.css-tiedostoa. Asettelu on tehty mobiili ensin: puhelimella sisältö on yhdessä sarakkeessa, ja leveämmällä näytöllä asettelu jakautuu useaan sarakkeeseen. Värit, fontit ja välit on määritelty muuttujina tiedoston alussa. Sivustolla on myös tumma tila, joka seuraa laitteen asetusta.

Ulkoasun perustelut, värit ja kontrastit ovat moodboard.md-tiedostossa.

## JavaScript

Kaikki sivut käyttävät yhtä app.js-tiedostoa, joka ladataan deferillä. Koodi ei käytä kirjastoja eikä onclick-attribuutteja, vaan tapahtumat kuunnellaan addEventListenerillä. Järjestysvalikko on HTML:n popover, ja kesken jäänyt adoptiokysely tallennetaan selaimen localStorageen. Tietoja ei lähetetä mihinkään palvelimelle.

## Tekniikat ja saavutettavuus

HTML5, CSS3 ja JavaScript. Versionhallinta: Git ja GitHub. Julkaisu: GitHub Pages.

Saavutettavuutta tukevat otsikkotasot, alt-tekstit, näppäimistökäyttö ja näkyvä fokus, sisältöön-siirtymislinkki sekä lomakkeen nimetyt kentät ja virheilmoitukset. Suodatin, järjestysvalikko ja lomake toimivat pelkällä näppäimistöllä, ja tilarivi kertoo ruudunlukijalle, montako eläintä näytetään. Tekstien kontrasti on vähintään 4.5:1 sekä vaaleassa että tummassa tilassa.

## Tiedostot

- plan.md – projektisuunnitelma: miten sivusto ratkaisee asiakkaan tarpeet.
- moodboard.md – ulkoasun tunnelma, värit, fontit ja lähteet.
- ai-log.md – tekoälyn käyttö: mitä pyysin, mitä sain ja mitä tein itse.
- KUVAT.txt – kuvien lähteet ja lisenssit.

Web-ohjelmointi · E1–E3.
