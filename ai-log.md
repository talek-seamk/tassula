# AI-loki

## Käytetyt työkalut

- Microsoft Copilot: E1-sivuston ensimmäinen toteutus, 7.11.2026
- Claude: E1-palautteen läpikäynti ja korjaukset, 13.11.2026

## 1. Sivujen perusrakenne, navigaatio ja Git (Copilot, 7.11.2026)

**Mitä yritin saada tekoälyn tekemään:** Neljän sivun HTML-rakenne, yhteinen navigaatio, lomakkeen pohja ja neuvoja Git-komentoihin.

Pyysin Copilotilta rungon neljälle HTML-sivulle, yhteisen navigaation ja lomakepohjan. Pyysin myös neuvoja Git-komentoihin. Annoin sille lähtötiedoksi asiakasbriefin, omat näkemykset sivusta ja myös osan luennoilta käytetyistä dia esityksistä.

**Mitä sain:** HTML-rakenne-ehdotuksia, navigaation, lomake-esimerkkejä ja Git-komentoja.

Hyödynsin Copilotin ehdottamaa neljän HTML-sivun runkoa, yhteistä navigaatiota ja lomakepohjaa. Käytin Git-komentoja mallina, kun tallensin muutokset ja pus­hasin ne repoon. Korvasin mallitekstit Tassulan omilla teksteillä ja jätin lomakkeesta pois kentät, joita adoptiokyselyssä ei tarvittu.

**Mitä jouduin tekemään itse:** E1-tägätyssä versiossa oli vielä virheitä, jotka W3C-validaattori olisi löytänyt: `<mta charset>`, puuttuva `<`-merkki meta-rivin alusta, puuttuvat viewport-rivit ja kuva `images/kissa.jpg`, jota ei ollut olemassa.

Kirjoitin kirjoitus virheitä ja tekoäly avustetusti, tämä muokkasi minun pohjaani avustaen väärin. Tekoäly hallusinoi minun omaa kirjoitusvirhettäni. ästä opin, että ennen tägäystä kannattaa validoida kaikkien sivujen HTML ja avata sivut selaimessa, jotta myös puuttuvat kuvat huomaa. Myös opetella paremmin käyttämään W3C-validaattoria.

## 2. Ulkoasun uudistus, eläinlista ja lomakkeen tarkistus (7.11.2026)

Commitissa "Improved website design and added images" sivusto muuttui paljon: uusi ulkoasu, eläintiedot animals.js-tiedostoon, lajisuodatus, adoptoitujen piilotus, lomakkeen virheiden tarkistus ja valmiin kyselyn yhteenveto.

Käytin työkalua Microsoft Copilot tekoälyä ja pyysin sitä tekemään pohjan sivuston rakeenteeseen, teksteille mitä asiakas vaati, kuvat, ja lomakepohjan. Commitissa Improved website design and added images sivusto sai uuden ulkoasun. Eläintiedot siirtyivät animals.js-tiedostoon, ja listaan tuli lajisuodatus ja mahdollisuus piilottaa adoptoidut eläimet. Lomakkeeseen lisättiin virheiden tarkistus ja täytetyn kyselyn yhteenveto.

## 3. E1-palautteen korjaus (Claude, 13.11.2026)

**Mitä yritin saada tekoälyn tekemään:** Annoin Claudelle Mikan E1-palautteen ja testiraportin, toimeksiannon ja zipin reposta. Pyysin selvittämään, mitä pitää korjata, ja muokkaamaan tiedostot kuntoon.

**Mitä sain:**

- Claude huomasi, että e1-tägi osoitti committiin 077811b (7.11. klo 15:02). Raportin HTML-virheet koskivat siis vanhaa versiota, ja myöhempi commit oli jo korjannut ne. Ongelma oli tägissä, ei nykyisessä koodissa.
- Claude ajoi uusimmalle versiolle selaimessa samat tarkistukset kuin testiraportissa: kuvat ja alt-tekstit, konsolivirheet, 360 px leveys, otsikot sekä header, valikko ja footer. Kaikki menivät läpi.
- Claude vaihtoi kaikille sivuille `<meta charset="UTF-8">` ja viewport-arvon `initial-scale=1.0`, koska testiskripti etsii juuri tätä muotoa.
- Claude kirjoitti plan.md:n uudelleen: Markdown-otsikot, enemmän sisältöä siitä, miten sivusto ratkaisee Tassulan ongelmat, värien kontrastisuhteet ja kolmas esimerkkisivusto (kodittomat.info). Lisäksi se teki tähän lokiin rungon.

**Mitä Claude ei voinut tehdä:** W3C-validaattoria se ei saanut ajettua, eikä se päässyt avaamaan HESYn eläinlistaa eikä kodittomat.info-sivua.

**Mitä jouduin tekemään itse:**

- Pushasin HTML-korjauksen ja ajoin W3C-validaattorin julkaistulle sivustolle kaikille neljälle sivulle 13.11.2026: ei virheitä eikä varoituksia.

## 4. E2: ulkoasu, tumma tila ja moodboard (Claude, 13.11.2026)

**Mitä yritin saada tekoälyn tekemään:** Annoin Claudelle luentojen 3 ja 4 kalvot ja pyysin tekemään pohjan josta muokkasin itse asiakas pyynnin mukaisesti, jota e2 vaati.

**Mitä sain:**
Hyvät pohjat ja sain ymärrettyä myös Clauden kautta miten tuo moodboard toimi.

- **style.css kirjoitettu uudelleen.** Vanha tiedosto oli yksi pitkä rivi. Uusi on luettava ja kommentoitu, ja se on tehty mobiili ensin (`min-width`-mediakyselyt 40rem ja 55rem). Värit, fontit ja välit ovat custom propertyinä `:root`issa, ja fonttikoot ovat remeinä. Eläinkortit asettuvat `repeat(auto-fit, minmax(...))`-gridillä, ja footer pysyy alhaalla `grid-template-rows: auto 1fr auto` -asettelulla.
- **Tumma tila** `prefers-color-scheme: dark` -kyselyllä. Se vaihtaa vain tokenit, ja korostusväri vaalenee, koska briefin #8a5a2b on tummalla taustalla vain 3.0:1.
- **Fokusvirhe korjattu.** Tumman kehotusalueen painikkeen fokusreunus oli samaa väriä kuin alueen tausta, eli lähes näkymätön. Nyt reunus on alueella vaalea.
- **Uudet tiedostot:** moodboard.md (tunnelma, värit kontrasteineen, fontit, kuvat, lähteet) ja images/moodboard/paletti.svg. Olin lisäämässä Fixes.md-pohjan, mutta en löytänyt sitä. Mika kertoi 14.11., että fixes.md jätetään pois E2:sta.
- **Tarkistukset.** Claude tarkisti selaimessa vaalean ja tumman tilan leveyksillä 320, 768 ja 1280 px: ei sivuttaisvieritystä, header vaihtuu riviksi isolla näytöllä, kaikki tekstit vähintään 4.5:1, fokus näkyy jokaisessa Tab-pysähdyksessä eikä style-attribuutteja ole.

**Mitä Claude ei voinut tehdä:** broken/-sivua se ei nähnyt, koska sitä ei ole ollut olemassa :D Kuvakaappauksia esimerkkisivustoista se ei voinut ottaa, eikä se voinut testata omalla puhelimellani toimiiko sivu oikein.

**Mitä jouduin tekemään itse:**

En muuttanut style.css:ää. Kävin sen läpi ja ymmärrän rakenteen: värit, fontit ja välit ovat :rootissa, asettelu on tehty mobiili ensin ja tumma tila vaihtaa vain värit. Jouduin toki korjaamaan, että style.css toimisi, koska jostain syystä se ei latautunut sivuilla, clauden tekemän kirjoitus virheen takia.

## 5. E3: JavaScript, järjestysvalikko ja tallennus selaimeen (Claude, 19.11.2026)

**Mitä yritin saada tekoälyn tekemään:** Annoin Claudelle luennon 5 kalvot, kahvilaharjoituksen pohjan (js-base-1) ja zipin reposta. Kysyin, pitääkö sivustoa muokata E3:a varten, ja pyysin tekemään tarvittavat muutokset.

**Mitä sain:**

- **Yksi JavaScript-tiedosto.** Claude huomasi, että sivut latasivat kaksi JavaScript-tiedostoa (animals.js ja app.js), vaikka E3 vaatii yhden. Eläintiedot siirrettiin app.js:n alkuun, ja animals.js poistettiin.
- **Luettava app.js.** Ennen koodi oli tiivistetty muutamaksi pitkäksi riviksi. Nyt se on kommentoitu ja jaettu osiin: data, apufunktiot ja oma funktio jokaiselle sivulle.
- **Järjestysvalikko.** Eläinsivulle tuli HTML:n popover (`popovertarget`), josta valitaan järjestys: pisimpään odottaneet ensin tai nimen mukaan. Valinta kuunnellaan yhdellä kuuntelijalla koko valikossa (delegointi), ja valittu vaihtoehto merkitään `aria-pressed`-attribuutilla kuten luennon suodatinpainikkeissa. Eläimille lisättiin esimerkkitulopäivä, ja kortissa lukee esimerkiksi "Saapui Tassulaan elokuussa 2026".
- **Tilarivi.** Rivi on nyt muotoa "Näytetään 1 / 3 kotia odottavaa eläintä, nimen mukaan (A–Ö)."
- **Tallennus selaimeen.** Lomake tallentaa keskeneräisen kyselyn localStorageen ja palauttaa sen, kun sivun avaa uudelleen. Lomakkeeseen tuli Tyhjennä lomake -painike, ja sivu kertoo, että tiedot ovat vain tässä selaimessa. Tallennus on try…catchin sisällä, joten lomake toimii, vaikka selain estäisi tallennuksen.
- **Ei onclick-attribuutteja.** Kaikki tapahtumat on kytketty `addEventListener`illä.
- **Tarkistukset.** Claude testasi selaimessa:
  - Joka sivulla on yksi app.js deferillä, eikä konsolissa ole virheitä.
  - Popover avautuu Enterillä ja sulkeutuu Escillä, ja fokus palaa Järjestys-painikkeeseen.
  - Suodatin toimii nuolinäppäimillä.
  - Tallennus säilyy sivun uudelleenlatauksen yli, ja tyhjennys poistaa sen.
  - E1- ja E2-tarkistukset (320 px, tumma tila, kontrastit, fokus) menivät yhä läpi.

**Mitä Claude ei voinut tehdä:** Se ei nähnyt luennon 6 kalvoja, joissa lomakkeet, tallennus ja popoverit käydään läpi, joten toteutus on tehty yleisillä HTML:n ja JavaScriptin keinoilla. W3C-validaattoria se ei saanut ajettua, eikä se voinut testata ruudunlukijalla tai omalla puhelimellani.

**Mitä jouduin tekemään itse:**

Purin muutokset repoon, poistin animals.js:n komennolla `git rm animals.js` ja pushasin koodin 19.11.
Pushin jälkeen sivu näytti rikkinäiseltä, eikä eläimiä näkynyt. Syy oli selaimen välimuisti: selain käytti vanhaa app.js:ää, joka etsi poistettua animals.js-tiedostoa. Ctrl+Shift+R latasi sivun ohi välimuistin, ja eläimet näkyivät taas.
Luin app.js:n läpi 20.11.

**Luennon 6 jälkeen (20.11.):** Annoin Claudelle luennon 6 kalvot ja js-base-2-pohjan. Claude vertasi toteutusta luennon E3-tarkistuslistaan ja muutti:

- Fokus siirtyy virheyhteenvedon sijaan ensimmäiseen virheelliseen kenttään.
- Lomakkeen alle tuli tilarivi (role="status"), joka kertoo, että kysely on valmis, ja ruudunlukija lukee sen ääneen. Lomake jää näkyviin, joten Muokkaa-painike poistettiin.
- Virhe poistuu heti, kun kenttä korjataan. Sama input-kuuntelija hoitaa myös luonnoksen tallennuksen.
- Selaimen virhekuplat otetaan pois JavaScriptillä (form.noValidate) eikä HTML:n novalidate-attribuutilla.
- "Kyselyä ei ole lähetetty" muutettiin muotoon "Kyselyä ei ole vielä välitetty Tassulalle", koska tarkistuslista kieltää "lähetetty!"-ilmoitukset.
- Järjestysvalikko sijoitetaan painikkeen alle ankkurisijoittelulla, kuten luennolla.
- Luonnos säilyy myös valmiin kyselyn jälkeen, vaikka luennon esimerkki poistaa sen. Kyselyä ei vielä välitetä minnekään, joten tiedot säilyvät, kunnes käyttäjä tyhjentää lomakkeen.
- W3C-validaattori löysi 22.11. virheen: Clauden lisäämää aria-expanded-attribuuttia ei saa käyttää painikkeessa, jossa on popovertarget, koska selain kertoo valikon tilan itse. Poistin sen.
- Sivusto toimi puhelimella, ei pystynyt vierittämään vaaka suunnassa. Tumma tila ja vaalea tila toimivat myös ja kaikki napit ovat mahdollista painaa. Lomake myös toimii samallalailla kuin tietokoneen selaimellakin.

