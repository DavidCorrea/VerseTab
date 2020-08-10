const bibleVersions = [ 
  { code: 'kjv', name: 'KJV' }
];

const books = [ 
  'psalms'
];

const chooseBibleAndBook = async () => {
  const bibleVersion = bibleVersions[Math.floor(Math.random() * bibleVersions.length)];
  const bookToUse = books[Math.floor(Math.random() * books.length)];

  const book = (await import(`./bibles/${bibleVersion.code}/${bookToUse}.js`)).default;

  return { book, bibleVersion: bibleVersion.name }
};

const chooseRandomVerseFromBook = ({ possibleVersesToShow }) => {
  const rawVerse = possibleVersesToShow[Math.floor(Math.random() * possibleVersesToShow.length)];
  const verseRegexp = rawVerse.match(/(?<chapterNumber>[0-9]*):(?<verseNumber>[0-9]*)/).groups;

  return { chapterNumber: verseRegexp.chapterNumber, verseNumber: verseRegexp.verseNumber };
};

const selectChapter = ({ chapters }, { chapterNumber }) => {
  return chapters.find((chapter) => chapter.chapter == chapterNumber);
};

const selectVerse = ({ verses }, { verseNumber }) => {
  return verses.find((verse) => verse.verse == verseNumber);
};

const buildVerseDescription = (bibleVersion, { name: bookName }, { chapterNumber, verseNumber }) => {
  return `${bookName} ${chapterNumber}:${verseNumber} - ${bibleVersion}`;
};

const parseVerseToShow = async () => {
  const { bibleVersion, book } = await chooseBibleAndBook();

  const verseLocation = chooseRandomVerseFromBook(book);
  const chapter = selectChapter(book, verseLocation);
  const { text } = selectVerse(chapter, verseLocation);

  document.querySelector('.verse__content').innerHTML = text;
  document.querySelector('.verse__details').innerHTML = buildVerseDescription(bibleVersion, book, verseLocation);
};

parseVerseToShow();
