import { Surah, Ayah, QaidaLesson, TajweedRule, Teacher, DuaItem } from '../types';

export const surahsData: Surah[] = [
  { number: 1, nameArabic: "الفَاتِحَة", nameEnglish: "Al-Fatihah", translation: "The Opener", versesCount: 7, revelationType: "Meccan" },
  { number: 2, nameArabic: "آيَةُ الْكُرْسِي", nameEnglish: "Ayat al-Kursi (2:255)", translation: "The Throne Verse", versesCount: 1, revelationType: "Medinan" },
  { number: 103, nameArabic: "العَصْر", nameEnglish: "Al-Asr", translation: "The Declining Day", versesCount: 3, revelationType: "Meccan" },
  { number: 108, nameArabic: "الكَوْثَر", nameEnglish: "Al-Kawthar", translation: "Abundance", versesCount: 3, revelationType: "Meccan" },
  { number: 109, nameArabic: "الكَافِرُون", nameEnglish: "Al-Kafirun", translation: "The Disbelievers", versesCount: 6, revelationType: "Meccan" },
  { number: 110, nameArabic: "النَّصْر", nameEnglish: "An-Nasr", translation: "The Divine Support", versesCount: 3, revelationType: "Medinan" },
  { number: 112, nameArabic: "الإِخْلَاص", nameEnglish: "Al-Ikhlas", translation: "The Sincerity", versesCount: 4, revelationType: "Meccan" },
  { number: 113, nameArabic: "الفَلَق", nameEnglish: "Al-Falaq", translation: "The Daybreak", versesCount: 5, revelationType: "Meccan" },
  { number: 114, nameArabic: "النَّاس", nameEnglish: "An-Nas", translation: "Mankind", versesCount: 6, revelationType: "Meccan" }
];

export const ayahsDataMap: Record<number, Ayah[]> = {
  1: [
    { surahNumber: 1, ayahNumber: 1, arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Bismillāhir-Raḥmānir-Raḥīm", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", tafsir: "Begins with the praise and acknowledgment of Allah's boundless mercy." },
    { surahNumber: 1, ayahNumber: 2, arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "Al-ḥamdu lillāhi Rabbil-'ālamīn", translation: "[All] praise is [due] to Allah, Lord of the worlds -", tafsir: "Acknowledges Allah as the supreme Creator and Sustainer of all existence." },
    { surahNumber: 1, ayahNumber: 3, arabicText: "الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Ar-Raḥmānir-Raḥīm", translation: "The Entirely Merciful, the Especially Merciful,", tafsir: "Emphasizes Allah's encompassing mercy to all creation and special mercy to believers." },
    { surahNumber: 1, ayahNumber: 4, arabicText: "مَالِكِ يَوْمِ الدِّينِ", transliteration: "Māliki Yawmid-Dīn", translation: "Sovereign of the Day of Recompense.", tafsir: "Points to the reality of the Hereafter and divine justice." },
    { surahNumber: 1, ayahNumber: 5, arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", transliteration: "Iyyāka na'budu wa iyyāka nasta'īn", translation: "It is You we worship and You we ask for help.", tafsir: "The core statement of pure Tawheed (Monotheism) and reliance upon Allah alone." },
    { surahNumber: 1, ayahNumber: 6, arabicText: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", transliteration: "Ihdinaṣ-ṣirāṭal-mustaqīm", translation: "Guide us to the straight path -", tafsir: "The fundamental supplication: seeking lifelong steadfastness upon truth." },
    { surahNumber: 1, ayahNumber: 7, arabicText: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", transliteration: "Ṣirāṭalladhīna an'amta 'alayhim ghayril-maghḍūbi 'alayhim walāḍ-ḍāllīn", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked anger or gone astray.", tafsir: "Following the path of the Prophets, truthful, and righteous." }
  ],
  2: [
    {
      surahNumber: 2,
      ayahNumber: 255,
      arabicText: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      transliteration: "Allāhu lā ilāha illā Huwal-Ḥayyul-Qayyūm, lā ta'khudhuhū sinatuw-wa lā nawm, lahū mā fis-samāwāti wa mā fil-arḍ, man dhal-ladhī yashfa'u 'indahū illā bi-idhnih, ya'lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay'im-min 'ilmihī illā bimā shā', wasi'a Kursiyyuhus-samāwāti wal-arḍ, wa lā ya'ūduhū ḥifẓuhumā, wa Huwal-'Aliyyul-'Aẓīm.",
      translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
      tafsir: "The greatest verse in the Quran, affirming absolute Tawheed, the eternal divine life, supreme knowledge, and complete power over all creation."
    }
  ],
  103: [
    { surahNumber: 103, ayahNumber: 1, arabicText: "وَالْعَصْرِ", transliteration: "Wal-'aṣr", translation: "By time,", tafsir: "Allah swears by time to emphasize the fleeting nature of human existence." },
    { surahNumber: 103, ayahNumber: 2, arabicText: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", transliteration: "Innal-insāna lafī khusr", translation: "Indeed, mankind is in loss,", tafsir: "Human effort ends in spiritual loss unless guided by divine revelation." },
    { surahNumber: 103, ayahNumber: 3, arabicText: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", transliteration: "Illalladhīna āmanū wa 'amiluṣ-ṣāliḥāti wa tawāṣaw bil-ḥaqqi wa tawāṣaw biṣ-ṣabr", translation: "Except for those who have believed, done righteous deeds, and advised each other to truth and patience.", tafsir: "The four universal pillars of salvation: Faith, righteous deeds, advising truth, and mutual patience." }
  ],
  108: [
    { surahNumber: 108, ayahNumber: 1, arabicText: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", transliteration: "Innā a'ṭaynākal-Kawthar", translation: "Indeed, We have granted you, [O Muhammad], al-Kawthar.", tafsir: "Al-Kawthar denotes the abundant good in this world and the celestial basin in Paradise." },
    { surahNumber: 108, ayahNumber: 2, arabicText: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", transliteration: "Faṣalli liRabbika wan-ḥar", translation: "So pray to your Lord and sacrifice [to Him alone].", tafsir: "Sincere gratitude manifested through prayer and charitable sacrifice." },
    { surahNumber: 108, ayahNumber: 3, arabicText: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", transliteration: "Inna shāni'aka huwal-abtar", translation: "Indeed, your enemy is the one cut off.", tafsir: "Truth always endures, while its opponents are severed from lasting blessing." }
  ],
  109: [
    { surahNumber: 109, ayahNumber: 1, arabicText: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", transliteration: "Qul yā ayyuhal-kāfirūn", translation: "Say, \"O disbelievers,", tafsir: "A clear declaration of pure monotheistic faith." },
    { surahNumber: 109, ayahNumber: 2, arabicText: "لَا أَعْبُدُ مَا تَعْبُدُونَ", transliteration: "Lā a'budu mā ta'budūn", translation: "I do not worship what you worship.", tafsir: "Absolute rejection of polytheism and false deities." },
    { surahNumber: 109, ayahNumber: 3, arabicText: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa lā antum 'ābidūna mā a'bud", translation: "Nor are you worshippers of what I worship.", tafsir: "Acknowledging their persistent refusal of the truth." },
    { surahNumber: 109, ayahNumber: 4, arabicText: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", transliteration: "Wa lā ana 'ābidum mā 'abattum", translation: "Nor will I be a worshipper of what you worship.", tafsir: "Firm, unwavering dedication to Allah alone." },
    { surahNumber: 109, ayahNumber: 5, arabicText: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", transliteration: "Wa lā antum 'ābidūna mā a'bud", translation: "Nor will you be worshippers of what I worship.", tafsir: "Reiterating spiritual distinction and clarity of faith." },
    { surahNumber: 109, ayahNumber: 6, arabicText: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", transliteration: "Lakum dīnukum wa liya dīn", translation: "For you is your religion, and for me is my religion.\"", tafsir: "Total disassociation from all compromises in belief." }
  ],
  110: [
    { surahNumber: 110, ayahNumber: 1, arabicText: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", transliteration: "Idhā jā'a naṣrullāhi wal-fatḥ", translation: "When the victory of Allah has come and the conquest,", tafsir: "Referring to the conquest of Mecca and the triumph of truth." },
    { surahNumber: 110, ayahNumber: 2, arabicText: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", transliteration: "Wa ra'aytan-nāsa yadkhulūna fī dīnillāhi afwājā", translation: "And you see the people entering into the religion of Allah in multitudes,", tafsir: "Tribes entering Islam in vast groups after seeing the truth." },
    { surahNumber: 110, ayahNumber: 3, arabicText: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", transliteration: "Fasabbiḥ biḥamdi Rabbika wastaghfirh, innahū kāna Tawwābā", translation: "Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.", tafsir: "Responding to triumph with humility, praise, and seeking forgiveness." }
  ],
  112: [
    { surahNumber: 112, ayahNumber: 1, arabicText: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul Huwallāhu Aḥad", translation: "Say, \"He is Allah, [who is] One,", tafsir: "Affirms absolute divine oneness with no partners." },
    { surahNumber: 112, ayahNumber: 2, arabicText: "اللَّهُ الصَّمَدُ", transliteration: "Allāhuṣ-Ṣamad", translation: "Allah, the Eternal Refuge.", tafsir: "The Self-Sufficient Master upon whom all creatures depend." },
    { surahNumber: 112, ayahNumber: 3, arabicText: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yūlad", translation: "He neither begets nor is born,", tafsir: "Purifies the concept of God from human parentage or offspring." },
    { surahNumber: 112, ayahNumber: 4, arabicText: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", transliteration: "Wa lam yakul-lahū kufuwan aḥad", translation: "Nor is there to Him any equivalent.\"", tafsir: "Nothing in existence resembles or equals Allah." }
  ],
  113: [
    { surahNumber: 113, ayahNumber: 1, arabicText: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'ūdhu bi Rabbil-falaq", translation: "Say, \"I seek refuge in the Lord of daybreak", tafsir: "Taking refuge with the Lord of the morning." },
    { surahNumber: 113, ayahNumber: 2, arabicText: "مِن شَرِّ مَا خَلَقَ", transliteration: "Min sharri mā khalaq", translation: "From the evil of that which He created", tafsir: "Protection from harms created in the world." },
    { surahNumber: 113, ayahNumber: 3, arabicText: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Wa min sharri ghāsiqin idhā waqab", translation: "And from the evil of darkness when it settles", tafsir: "Protection from dangers of the deep night." },
    { surahNumber: 113, ayahNumber: 4, arabicText: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "Wa min sharrin-naffāthāti fil-'uqad", translation: "And from the evil of the blowers in knots", tafsir: "Protection from witchcraft and hidden envy." },
    { surahNumber: 113, ayahNumber: 5, arabicText: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "Wa min sharri ḥāsidin idhā ḥasad", translation: "And from the evil of an envier when he envies.\"", tafsir: "Shielding one's blessings from malicious envy." }
  ],
  114: [
    { surahNumber: 114, ayahNumber: 1, arabicText: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'ūdhu bi Rabbin-nās", translation: "Say, \"I seek refuge in the Lord of mankind,", tafsir: "Seeking protection from the Sustainer of all people." },
    { surahNumber: 114, ayahNumber: 2, arabicText: "مَلِكِ النَّاسِ", transliteration: "Malikin-nās", translation: "The Sovereign of mankind.", tafsir: "Acknowledging His supreme dominion." },
    { surahNumber: 114, ayahNumber: 3, arabicText: "إِلَٰهِ النَّاسِ", transliteration: "Ilāhin-nās", translation: "The God of mankind,", tafsir: "Devoting sincere worship to Him alone." },
    { surahNumber: 114, ayahNumber: 4, arabicText: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "Min sharril-waswāsil-khannās", translation: "From the evil of the retreating whisperer -", tafsir: "Protection from the stealthy devil." },
    { surahNumber: 114, ayahNumber: 5, arabicText: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "Alladhī yuwaswisu fī ṣudūrin-nās", translation: "Who whispers into the breasts of mankind -", tafsir: "Safeguarding inner heart and thoughts." },
    { surahNumber: 114, ayahNumber: 6, arabicText: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "Minal-jinnati wan-nās", translation: "From among the jinn and mankind.\"", tafsir: "Recognizing evil influences from visible and unseen realms." }
  ]
};

export const qaidaLessonsData: QaidaLesson[] = [
  {
    id: 1,
    title: "Lesson 1: Individual Letters (Mufradat)",
    titleArabic: "حُرُوفُ التَّهَجِّي الْمُفْرَدَة",
    description: "Learn the 29 individual Arabic letters with exact articulation points (Makharij).",
    level: "Beginner",
    items: [
      { symbol: "ا", name: "Alif", transliteration: "Alif", makhraj: "Empty space of mouth & throat (Jawf)", sound: "Alif" },
      { symbol: "ب", name: "Baa", transliteration: "Bā'", makhraj: "Moist inner lips meeting together", sound: "Baa" },
      { symbol: "ت", name: "Taa", transliteration: "Tā'", makhraj: "Tip of tongue on roots of upper teeth", sound: "Taa" },
      { symbol: "ث", name: "Thaa", transliteration: "Thā'", makhraj: "Tip of tongue on edges of upper teeth", sound: "Thaa" },
      { symbol: "ج", name: "Jeem", transliteration: "Jīm", makhraj: "Middle tongue touching the palate", sound: "Jeem" },
      { symbol: "ح", name: "Haa", transliteration: "Ḥā'", makhraj: "Middle of the throat (clean rasp)", sound: "Haa" },
      { symbol: "خ", name: "Khaa", transliteration: "Khā'", makhraj: "Top of the throat near uvula (Heavy)", sound: "Khaa" },
      { symbol: "د", name: "Daal", transliteration: "Dāl", makhraj: "Tip of tongue on upper tooth roots", sound: "Daal" },
      { symbol: "ذ", name: "Dhaal", transliteration: "Dhāl", makhraj: "Tip of tongue on edge of incisors", sound: "Dhaal" },
      { symbol: "ر", name: "Raa", transliteration: "Rā'", makhraj: "Tip of tongue gently rolling near gum", sound: "Raa" },
      { symbol: "ز", name: "Zaa", transliteration: "Zāy", makhraj: "Tip of tongue behind lower teeth", sound: "Zaa" },
      { symbol: "س", name: "Seen", transliteration: "Sīn", makhraj: "Tip of tongue with soft whistle", sound: "Seen" },
      { symbol: "ش", name: "Sheen", transliteration: "Shīn", makhraj: "Middle of tongue with spreading breath", sound: "Sheen" },
      { symbol: "ص", name: "Saad", transliteration: "Ṣād", makhraj: "Heavy letter from tongue tip", sound: "Saad" },
      { symbol: "ض", name: "Daad", transliteration: "Ḍād", makhraj: "Edge of tongue touching upper molars", sound: "Daad" },
      { symbol: "ط", name: "Taa", transliteration: "Ṭā'", makhraj: "Heavy dental stop on upper palate", sound: "Taa" },
      { symbol: "ظ", name: "Zhaa", transliteration: "Ẓā'", makhraj: "Heavy interdental on upper incisors", sound: "Zhaa" },
      { symbol: "ع", name: "Ain", transliteration: "'Ayn", makhraj: "Middle of the throat squeeze", sound: "Ayn" },
      { symbol: "غ", name: "Ghain", transliteration: "Ghayn", makhraj: "Top throat soft gargle (Heavy)", sound: "Ghain" },
      { symbol: "ف", name: "Faa", transliteration: "Fā'", makhraj: "Upper teeth on inner lower lip", sound: "Faa" },
      { symbol: "ق", name: "Qaaf", transliteration: "Qāf", makhraj: "Deepest back of tongue (Qalqalah)", sound: "Qaaf" },
      { symbol: "ك", name: "Kaaf", transliteration: "Kāf", makhraj: "Back tongue with gentle breath (Hams)", sound: "Kaaf" },
      { symbol: "ل", name: "Laam", transliteration: "Lām", makhraj: "Front side of tongue on upper gum", sound: "Laam" },
      { symbol: "م", name: "Meem", transliteration: "Mīm", makhraj: "Dry lips touching with Ghunnah hum", sound: "Meem" },
      { symbol: "ن", name: "Noon", transliteration: "Nūn", makhraj: "Tip of tongue on upper gum ridge", sound: "Noon" },
      { symbol: "و", name: "Waw", transliteration: "Wāw", makhraj: "Rounding lips without full closure", sound: "Waw" },
      { symbol: "ه", name: "Haa", transliteration: "Hā'", makhraj: "Bottom of throat near chest (Soft)", sound: "Haa" },
      { symbol: "ء", name: "Hamzah", transliteration: "Hamzah", makhraj: "Deepest throat abrupt vocal stop", sound: "Hamzah" },
      { symbol: "ي", name: "Yaa", transliteration: "Yā'", makhraj: "Middle of tongue rising towards palate", sound: "Yaa" }
    ]
  },
  {
    id: 2,
    title: "Lesson 2: Harakat (Short Vowels)",
    titleArabic: "الْحَرَكَات: فَتْحَة، كَسْرَة، ضَمَّة",
    description: "Master the fundamental short vowels: Fatha (a), Kasra (i), and Damma (u).",
    level: "Beginner",
    items: [
      { symbol: "بَ", name: "Baa Fatha", transliteration: "Ba", makhraj: "Open short 'a' without stretching", sound: "Ba" },
      { symbol: "بِ", name: "Baa Kasra", transliteration: "Bi", makhraj: "Lowering jaw crisp 'i' sound", sound: "Bi" },
      { symbol: "بُ", name: "Baa Damma", transliteration: "Bu", makhraj: "Rounding lips smooth 'u' sound", sound: "Bu" },
      { symbol: "تَ", name: "Taa Fatha", transliteration: "Ta", makhraj: "Clean open 'Ta' sound", sound: "Ta" },
      { symbol: "تِ", name: "Taa Kasra", transliteration: "Ti", makhraj: "Crisp 'Ti' sound", sound: "Ti" },
      { symbol: "تُ", name: "Taa Damma", transliteration: "Tu", makhraj: "Rounded 'Tu' sound", sound: "Tu" },
      { symbol: "دَ", name: "Daal Fatha", transliteration: "Da", makhraj: "Open 'Da' sound", sound: "Da" },
      { symbol: "دِ", name: "Daal Kasra", transliteration: "Di", makhraj: "Crisp 'Di' sound", sound: "Di" },
      { symbol: "دُ", name: "Daal Damma", transliteration: "Du", makhraj: "Rounded 'Du' sound", sound: "Du" }
    ]
  },
  {
    id: 3,
    title: "Lesson 3: Tanween (Double Vowels)",
    titleArabic: "التَّنْوِين: فَتْحَتَيْن، كَسْرَتَيْن، ضَمَّتَيْن",
    description: "Pronouncing the hidden noon sound in Fathatayn (an), Kasratayn (in), and Dammatayn (un).",
    level: "Elementary",
    items: [
      { symbol: "بً", name: "Baa Fathatayn", transliteration: "Ban", makhraj: "Produces 'Ban' with light nasal hum", sound: "Ban" },
      { symbol: "بٍ", name: "Baa Kasratayn", transliteration: "Bin", makhraj: "Produces 'Bin' with light nasal hum", sound: "Bin" },
      { symbol: "بٌ", name: "Baa Dammatayn", transliteration: "Bun", makhraj: "Produces 'Bun' with light nasal hum", sound: "Bun" },
      { symbol: "تً", name: "Taa Fathatayn", transliteration: "Tan", makhraj: "Produces 'Tan' with clean nasal resonance", sound: "Tan" },
      { symbol: "تٍ", name: "Taa Kasratayn", transliteration: "Tin", makhraj: "Produces 'Tin' with clean nasal resonance", sound: "Tin" },
      { symbol: "تٌ", name: "Taa Dammatayn", transliteration: "Tun", makhraj: "Produces 'Tun' with clean nasal resonance", sound: "Tun" }
    ]
  },
  {
    id: 4,
    title: "Lesson 4: Sukoon & Jazm (Resting Consonants)",
    titleArabic: "السُّكُون وَالْجَزْم",
    description: "Connecting a vowelless letter smoothly to the preceding vowel.",
    level: "Elementary",
    items: [
      { symbol: "أَبْ", name: "Alif Fatha Baa Sukoon", transliteration: "Ab", makhraj: "Baa resting on Alif with Qalqalah echo bounce", sound: "Ab" },
      { symbol: "إِبْ", name: "Alif Kasra Baa Sukoon", transliteration: "Ib", makhraj: "Baa resting with Qalqalah bounce", sound: "Ib" },
      { symbol: "أُبْ", name: "Alif Damma Baa Sukoon", transliteration: "Ub", makhraj: "Baa resting with Qalqalah bounce", sound: "Ub" },
      { symbol: "أَتْ", name: "Alif Fatha Taa Sukoon", transliteration: "At", makhraj: "Crisp cut of air (Hams) on Taa", sound: "At" },
      { symbol: "قُلْ", name: "Qaaf Damma Laam Sukoon", transliteration: "Qul", makhraj: "Say! - Clean connection to vowelless Laam", sound: "Qul" },
      { symbol: "مِنْ", name: "Meem Kasra Noon Sukoon", transliteration: "Min", makhraj: "From - Noon resting with Ghunnah potential", sound: "Min" }
    ]
  },
  {
    id: 5,
    title: "Lesson 5: Tashdeed / Shaddah (Doubled Letters)",
    titleArabic: "الشَّدَّة وَالتَّشْدِيد",
    description: "Doubling a consonant where the first is silent and the second carries a vowel.",
    level: "Intermediate",
    items: [
      { symbol: "أَبَّ", name: "Abba", transliteration: "Abba", makhraj: "First Baa silent, second vocalized with Fatha", sound: "Abba" },
      { symbol: "أَبِّ", name: "Abbi", transliteration: "Abbi", makhraj: "First Baa silent, second vocalized with Kasra", sound: "Abbi" },
      { symbol: "أَبُّ", name: "Abbu", transliteration: "Abbu", makhraj: "First Baa silent, second vocalized with Damma", sound: "Abbu" },
      { symbol: "إِنَّ", name: "Inna", transliteration: "Inna", makhraj: "Noon Mushaddadah - holds 2 counts of Ghunnah nasal flow", sound: "Inna" },
      { symbol: "ثُمَّ", name: "Thumma", transliteration: "Thumma", makhraj: "Meem Mushaddadah - holds 2 counts of Ghunnah", sound: "Thumma" }
    ]
  }
];

export const tajweedRulesData: TajweedRule[] = [
  {
    id: "noon_izhar",
    title: "Izhar (Clear Pronunciation)",
    titleArabic: "الإِظْهَار الحَلْقِي",
    category: "Noon Saakin & Tanween",
    explanation: "Pronouncing the Noon Saakin or Tanween clearly without nasal lingering when followed by any of the 6 throat letters: Hamzah (ء), Haa (هـ), Ayn (ع), Haa (ح), Ghayn (غ), Khaa (خ).",
    examples: [
      { arabic: "مَنْ آمَنَ", highlight: "نْ آ", transliteration: "Man āmana", explanation: "Noon Saakin before Hamzah: pronounce 'Man' crisp and clear." },
      { arabic: "عَنْهُمْ", highlight: "نْ هُ", transliteration: "'Anhum", explanation: "Noon Saakin before Haa: clear 'An' without hum." },
      { arabic: "سَلَامٌ هِيَ", highlight: "مٌ هِ", transliteration: "Salāmun hiya", explanation: "Tanween before Haa: clean 'un' sound." }
    ]
  },
  {
    id: "noon_idgham",
    title: "Idgham (Merging)",
    titleArabic: "الإِدْغَام",
    category: "Noon Saakin & Tanween",
    explanation: "Merging the Noon Saakin or Tanween into the next letter. Letters of Idgham are Yarmaloon (ي، ر، م، ل، و، ن). Merged with Ghunnah (nasal tone) on (ي، ن، م، و), and without Ghunnah on (ل، ر).",
    examples: [
      { arabic: "مَن يَقُولُ", highlight: "ن ي", transliteration: "May-yaqūlu", explanation: "Noon merges into Yaa with a melodious 2-beat nasal resonance." },
      { arabic: "مِن مَّالٍ", highlight: "ن مَّ", transliteration: "Mim-mālin", explanation: "Noon blends seamlessly into Meem." },
      { arabic: "مِّن رَّبِّهِمْ", highlight: "ن رَّ", transliteration: "Mir-Rabbihim", explanation: "Idgham without Ghunnah: Noon merges into Raa completely." }
    ]
  },
  {
    id: "noon_iqlab",
    title: "Iqlab (Conversion to Meem)",
    titleArabic: "الإِقْلَاب",
    category: "Noon Saakin & Tanween",
    explanation: "Changing the sound of Noon Saakin or Tanween into a gentle Meem with Ghunnah when followed by the letter Baa (ب). Indicated in the Quran by a small Meem (مـ).",
    examples: [
      { arabic: "مِن بَعْدِ", highlight: "نۢ بَ", transliteration: "Mim-ba'di", explanation: "The Noon changes to a smooth Meem before Baa." },
      { arabic: "سَمِيعٌ بَصِيرٌ", highlight: "عٌۢ بَ", transliteration: "Samī'um-baṣīr", explanation: "Tanween becomes Meem with closed-lip Ghunnah." }
    ]
  },
  {
    id: "noon_ikhfa",
    title: "Ikhfa (Concealment)",
    titleArabic: "الإِخْفَاء الحَقِيقِي",
    category: "Noon Saakin & Tanween",
    explanation: "Concealing the Noon Saakin or Tanween with a gentle 2-count nasal tone before any of the remaining 15 letters (ت، ث، ج، د، ذ، ز، س، ش، ص، ض، ط، ظ، ف، ق، ك).",
    examples: [
      { arabic: "مِن قَبْلُ", highlight: "ن قَ", transliteration: "Min-qablu", explanation: "Mouth prepares for Qaaf while nasal air flows for 2 counts." },
      { arabic: "كُنتُمْ", highlight: "ن تُ", transliteration: "Kuntum", explanation: "Concealed Noon before Taa." }
    ]
  },
  {
    id: "qalqalah",
    title: "Qalqalah (Echo / Bounce)",
    titleArabic: "القَلْقَلَة",
    category: "Articulation Rules",
    explanation: "An echoing vibration produced when pronouncing the 5 Qalqalah letters (ق، ط، ب، ج، د - grouped as Qutb Jad) when carrying a Sukoon or when pausing on them at verse end.",
    examples: [
      { arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", highlight: "دْ", transliteration: "Aḥad(e)", explanation: "Strong bounce on Daal when pausing at the end of the ayah (Kubra)." },
      { arabic: "الْفَلَقِ", highlight: "قْ", transliteration: "Al-Falaq(e)", explanation: "Strong rebound on Qaaf at end of ayah." }
    ]
  },
  {
    id: "ghunnah",
    title: "Ghunnah (Nasalization)",
    titleArabic: "الغُنَّة",
    category: "Nasal Rules",
    explanation: "A resonant tone produced exclusively from the nasal cavity. Compulsory for 2 counts on Noon and Meem when they carry a Shaddah (نّ، مّ).",
    examples: [
      { arabic: "إِنَّ اللَّهَ", highlight: "نَّ", transliteration: "Inna-llāh", explanation: "Full 2 counts of melodious nasal tone on Noon." },
      { arabic: "عَمَّ يَتَسَاءَلُونَ", highlight: "مَّ", transliteration: "'Amma yatasā'alūn", explanation: "2 counts of nasal tone on Meem Mushaddadah." }
    ]
  }
];

export const teachersData: Teacher[] = [
  {
    id: "t1",
    name: "Sheikh Ahmad Al-Masri",
    title: "Senior Quran & Tajweed Specialist",
    qualification: "Experienced Quran & Tajweed Educator",
    ijazah: "Certified in Tajweed & Hafs Recitation",
    subjects: ["Tajweed Rules", "Nazra Reading", "Makharij Articulation", "Tafsir"],
    languages: ["English", "Arabic"],
    experienceYears: 14,
    rating: 4.95,
    reviewsCount: 184,
    bio: "Senior instructor specializing in clearing pronunciation obstacles for youth and beginners. Warm, patient, and highly structured.",
    gender: "male",
    availableToday: true,
    availableSlots: ["09:00 AM", "11:30 AM", "03:00 PM", "05:00 PM", "08:00 PM"]
  },
  {
    id: "t2",
    name: "Ustadha Fatima Khan",
    title: "Child Quran Pedagogy & Noorani Qaida Master",
    qualification: "Child Pedagogy & Early Quran Education Specialist",
    ijazah: "Certified Noorani Qaida Instructor",
    subjects: ["Noorani Qaida for Kids", "Tajweed Basics", "Short Surahs", "Stories of the Prophets"],
    languages: ["English", "Urdu"],
    experienceYears: 9,
    rating: 4.98,
    reviewsCount: 212,
    bio: "Loved by young children worldwide for fun, highly engaging lessons using visual cards, gentle encouragement, and stars.",
    gender: "female",
    availableToday: true,
    availableSlots: ["10:00 AM", "01:30 PM", "04:30 PM", "06:00 PM"]
  },
  {
    id: "t3",
    name: "Qari Muhammad Bilal",
    title: "Hifz ul-Quran & Qira'at Mentor",
    qualification: "Hifz Mentor & Quran Memorization Guide",
    ijazah: "Quran Recitation & Memorization Mentor",
    subjects: ["Hifz Memorization", "Revision (Muraja'ah)", "Voice Modulation", "Advanced Tajweed"],
    languages: ["English", "Arabic", "Urdu"],
    experienceYears: 16,
    rating: 4.92,
    reviewsCount: 159,
    bio: "Has guided dozens of students to solid Quran memorization. Specializes in effective memory retention systems (Sabaq, Sabqi, Manzil).",
    gender: "male",
    availableToday: false,
    availableSlots: ["08:00 AM", "02:00 PM", "07:00 PM"]
  },
  {
    id: "t4",
    name: "Ustadha Maryam Siddiqui",
    title: "Youth Quran & Character Building Educator",
    qualification: "Youth Quran & Character Building Educator",
    ijazah: "Certified Quran Teacher & Youth Educator",
    subjects: ["Noorani Qaida", "Nazra", "Dua & Azkar", "Teens Mentorship"],
    languages: ["English", "Urdu"],
    experienceYears: 7,
    rating: 4.89,
    reviewsCount: 98,
    bio: "Dedicated to creating safe, inspiring spaces for young sisters and boys to connect deeply with the Holy Quran with clarity and patience.",
    gender: "female",
    availableToday: true,
    availableSlots: ["11:00 AM", "03:30 PM", "06:30 PM", "08:30 PM"]
  }
];

export const dailyDuasData: DuaItem[] = [
  {
    id: "dua_waking",
    title: "Upon Waking Up",
    category: "Daily Morning",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Al-ḥamdu lillāhil-ladhī aḥyānā ba'da mā amātanā wa ilayhin-nushūr",
    translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
    reference: "Sahih al-Bukhari 6312"
  },
  {
    id: "dua_knowledge",
    title: "Dua for Knowledge & Understanding",
    category: "Quran & Study",
    arabic: "رَّبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidnī 'ilmā",
    translation: "My Lord, increase me in knowledge.",
    reference: "Surah Ta-Ha 20:114"
  },
  {
    id: "dua_sleep",
    title: "Before Sleeping",
    category: "Night Azkar",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allāhumma amūtu wa aḥyā",
    translation: "In Your name, O Allah, I die and I live.",
    reference: "Sahih al-Bukhari 6324"
  },
  {
    id: "dua_forgiveness",
    title: "Master of Seeking Forgiveness (Sayyidul Istighfar)",
    category: "Forgiveness",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
    transliteration: "Allāhumma Anta Rabbī lā ilāha illā Anta, khalaqtanī wa anā 'abduka, wa anā 'alā 'ahdika wa wa'dika mastaṭa'tu...",
    translation: "O Allah, You are my Lord, none has the right to be worshiped but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can...",
    reference: "Sahih al-Bukhari 6306"
  }
];

export const hadithsData = [
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation: "The best among you are those who learn the Quran and teach it.",
    reference: "Sahih al-Bukhari 5027"
  },
  {
    arabic: "الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ",
    translation: "The one who is proficient in the recitation of the Quran will be with the noble scribes (angels).",
    reference: "Sahih Muslim 798"
  },
  {
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Actions are judged by their intentions, and every person will get what he intended.",
    reference: "Sahih al-Bukhari 1"
  }
];
