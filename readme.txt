-----------Implementarea-----------------
Aplicatia a avut ca sursa de inspiratie GoodReads. Un utilizator se poate inregistra folosind contul Google, fiind inscris
intr-o baza de date ce tine evidenta fiecarui user, alaturi de informatii despre contul acestuia (de ex. numele, linkul catre
poze de profil, cartile la care a adaugat o recenzie etc.)

Nu am stiut cum sa folosesc API-ul Google Books (cerea un anumit token), deci am creat o baza de date pe MockAPI si am 
folosit-o pe aceea. (acolo avea numele autorului si titlul cartii puse random).

Am avut niste erori cand am vrut sa lucrez cu Firebase-ul, asa ca am folosit componenta Google Login din React, alaturi de
o alta baza de date facuta cu MockAPI (cea in care stochez utilizatorii).

Partea de UI am facut-o in SCSS;

-----------Cum functioneaza--------------

--> Pentru a adauga un comentariu la o anumita carte, se apasa pe iconita care pulseaza (cea care reprezinta cartile). Se scrie
o recenzie, se apasa pe iconita de adauga si este inregistrata in baza de date. 

--> Pentru a avea recenziile si numarul acestor,
se apasa pe iconita de sub nume (exista o sagetica care arata spre aceasta). Numarul de review-uri se actualizeaza doar dupa
ce se apasa iconita respectiva.

--> Pentru a cauta alti utlizatori, se scrie numele dorit sau o parte din acesta, si se apasa pe iconita de cautare. Exista deja
niste useri declarati random.

--> Pentru a iesi din aplicatie, utilizatorul isi va sterge contul, pierzand toate datele (se apasa pe "I'm out").

--> Pentru a iesi din componentele Carti, Recenzii si Utilizatori, se poate apasa iconita din stanga sus din fiecare componenta,
sau se apasa iar(toggle) pe iconita cu Carti si cu Recenzii ( la componenta cu utilizatori merge DOAR prin iconita de iesire din 
componenta)
