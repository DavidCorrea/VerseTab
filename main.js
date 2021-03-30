/*
possibleVersesToShow: [
    '1:1',
    '2:7',
    '9:1',
    '14:1',
    '16:8',
    '19:1',
    '19:7',
    '20:4',
    '23:1',
    '24:1',
    '27:1',
    '37:4',
    '46:1',
    '46:10',
    '51:5',
    '51:10',
    '90:2',
    '91:1',
    '103:1',
    '110:1',
    '119:11',
    '119:105',
    '127:3',
    '139:1',
    '139:13',
  ],
  */

const randomFrom = list => list[Math.floor(Math.random() * list.length)];

const chooseBible = async () => {
  const allBibles = (await import('./verses.js')).default;
  const bible = randomFrom(allBibles);

  return bible;
};

const buildVerseDescription = ({ version }, { book, chapter, verse }) => {
  return `${book} ${chapter}:${verse} - ${version}`;
};

const parseVerseToShow = async () => {
  const bible = await chooseBible();
  const verse = randomFrom(bible.verses);

  document.querySelector('.verse__content').innerHTML = verse.text;
  document.querySelector('.verse__details').innerHTML = buildVerseDescription(bible, verse);
};

parseVerseToShow();
