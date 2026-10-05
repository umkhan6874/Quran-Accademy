package com.example.data.repository

import com.example.data.model.Ayah
import com.example.data.model.DuaItem
import com.example.data.model.QaidaItem
import com.example.data.model.QaidaLesson
import com.example.data.model.Surah
import com.example.data.model.TajweedExample
import com.example.data.model.TajweedRule

object QuranData {

    val surahs: List<Surah> = listOf(
        Surah(1, "الفَاتِحَة", "Al-Fatihah", "The Opener", 7, "Meccan"),
        Surah(2, "البَقَرَة", "Al-Baqarah (Ayat al-Kursi)", "The Cow", 286, "Medinan"),
        Surah(36, "يس", "Ya-Sin", "Ya-Sin", 83, "Meccan"),
        Surah(67, "المُلْك", "Al-Mulk", "The Sovereignty", 30, "Meccan"),
        Surah(103, "العَصْر", "Al-Asr", "The Declining Day", 3, "Meccan"),
        Surah(108, "الكَوْثَر", "Al-Kawthar", "Abundance", 3, "Meccan"),
        Surah(112, "الإِخْلَاص", "Al-Ikhlas", "The Sincerity", 4, "Meccan"),
        Surah(113, "الفَلَق", "Al-Falaq", "The Daybreak", 5, "Meccan"),
        Surah(114, "النَّاس", "An-Nas", "Mankind", 6, "Meccan")
    )

    val ayahsMap: Map<Int, List<Ayah>> = mapOf(
        1 to listOf(
            Ayah(1, 1, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "Bismillāhir-Raḥmānir-Raḥīm", "In the name of Allah, the Entirely Merciful, the Especially Merciful.", "Begins with the praise and acknowledgment of Allah's boundless mercy."),
            Ayah(1, 2, "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "Al-ḥamdu lillāhi Rabbil-'ālamīn", "[All] praise is [due] to Allah, Lord of the worlds -", "Acknowledges Allah as the supreme Creator, Sustainer, and Lord of all existence."),
            Ayah(1, 3, "الرَّحْمَٰنِ الرَّحِيمِ", "Ar-Raḥmānir-Raḥīm", "The Entirely Merciful, the Especially Merciful,", "Emphasizes Allah's encompassing mercy to all creation and special mercy to believers."),
            Ayah(1, 4, "مَالِكِ يَوْمِ الدِّينِ", "Māliki Yawmid-Dīn", "Sovereign of the Day of Recompense.", "Points to the reality of the Hereafter and ultimate justice."),
            Ayah(1, 5, "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "Iyyāka na'budu wa iyyāka nasta'īn", "It is You we worship and You we ask for help.", "The core statement of pure Tawheed (Monotheism) and total reliance upon Allah."),
            Ayah(1, 6, "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "Ihdinaṣ-ṣirāṭal-mustaqīm", "Guide us to the straight path -", "The greatest supplication: requesting ongoing guidance on the truth."),
            Ayah(1, 7, "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "Ṣirāṭalladhīna an'amta 'alayhim ghayril-maghḍūbi 'alayhim walāḍ-ḍāllīn", "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.", "Following the footsteps of the Prophets, righteous, and truthful.")
        ),
        112 to listOf(
            Ayah(112, 1, "قُلْ هُوَ اللَّهُ أَحَدٌ", "Qul Huwallāhu Aḥad", "Say, \"He is Allah, [who is] One,", "Affirms the absolute Oneness and uniqueness of Allah with no partners."),
            Ayah(112, 2, "اللَّهُ الصَّمَدُ", "Allāhuṣ-Ṣamad", "Allah, the Eternal Refuge.", "The Self-Sufficient Master whom all creatures need, while He needs none."),
            Ayah(112, 3, "لَمْ يَلِدْ وَلَمْ يُولَدْ", "Lam yalid wa lam yūlad", "He neither begets nor is born,", "Purifies the conception of God from human parentage or offspring."),
            Ayah(112, 4, "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", "Wa lam yakul-lahū kufuwan aḥad", "Nor is there to Him any equivalent.\"", "Nothing in creation is comparable to Allah in His Majesty.")
        ),
        113 to listOf(
            Ayah(113, 1, "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "Qul a'ūdhu bi Rabbil-falaq", "Say, \"I seek refuge in the Lord of daybreak", "Seeking divine sanctuary with the Lord who splits the darkness with morning."),
            Ayah(113, 2, "مِن شَرِّ مَا خَلَقَ", "Min sharri mā khalaq", "From the evil of that which He created", "Protection from all harmful elements and creatures."),
            Ayah(113, 3, "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "Wa min sharri ghāsiqin idhā waqab", "And from the evil of darkness when it settles", "Protection during night hours when harm easily conceals itself."),
            Ayah(113, 4, "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "Wa min sharrin-naffāthāti fil-'uqad", "And from the evil of the blowers in knots", "Protection from envy, witchcraft, and malicious whisperings."),
            Ayah(113, 5, "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", "Wa min sharri ḥāsidin idhā ḥasad", "And from the evil of an envier when he envies.\"", "Shielding one's soul and blessings from destructive envy.")
        ),
        114 to listOf(
            Ayah(114, 1, "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "Qul a'ūdhu bi Rabbin-nās", "Say, \"I seek refuge in the Lord of mankind,", "Turning to the true Protector and Sustainer of all people."),
            Ayah(114, 2, "مَلِكِ النَّاسِ", "Malikin-nās", "The Sovereign of mankind.", "Recognizing Allah's ultimate governance over the universe."),
            Ayah(114, 3, "إِلَٰهِ النَّاسِ", "Ilāhin-nās", "The God of mankind,", "Worshiping Him alone without partners."),
            Ayah(114, 4, "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "Min sharril-waswāsil-khannās", "From the evil of the retreating whisperer -", "Seeking shield from the stealthy devil who whispers doubt."),
            Ayah(114, 5, "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "Alladhī yuwaswisu fī ṣudūrin-nās", "Who whispers into the breasts of mankind -", "Defending the purity of the heart against negative suggestions."),
            Ayah(114, 6, "مِنَ الْجِنَّةِ وَالنَّاسِ", "Minal-jinnati wan-nās", "From among the jinn and mankind.\"", "Recognizing evil influences can arise from both unseen and visible realms.")
        ),
        103 to listOf(
            Ayah(103, 1, "وَالْعَصْرِ", "Wal-'aṣr", "By time,", "Allah swears by time to emphasize how precious human life is."),
            Ayah(103, 2, "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", "Innal-insāna lafī khusr", "Indeed, mankind is in loss,", "All human endeavors end in deficit except those aligned with truth."),
            Ayah(103, 3, "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", "Illalladhīna āmanū wa 'amiluṣ-ṣāliḥāti wa tawāṣaw bil-ḥaqqi wa tawāṣaw biṣ-ṣabr", "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.", "The four pillars of salvation in Islam.")
        ),
        108 to listOf(
            Ayah(108, 1, "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "Innā a'ṭaynākal-Kawthar", "Indeed, We have granted you, [O Muhammad], al-Kawthar.", "A fountain in Paradise and boundless goodness."),
            Ayah(108, 2, "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "Faṣalli liRabbika wan-ḥar", "So pray to your Lord and sacrifice [to Him alone].", "Sincere devotion through prayer and charity."),
            Ayah(108, 3, "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "Inna shāni'aka huwal-abtar", "Indeed, your enemy is the one cut off.", "Reassurance that truth triumphs over hostility.")
        )
    )

    val qaidaLessons: List<QaidaLesson> = listOf(
        QaidaLesson(
            id = 1,
            title = "Lesson 1: The Arabic Alphabet",
            titleArabic = "حُرُوفُ التَّهَجِّي الْمُفْرَدَة",
            description = "Learn the 29 individual Arabic letters with exact articulation points (Makharij).",
            level = "Beginner",
            items = listOf(
                QaidaItem("ا", "Alif", "Alif", "Empty space of mouth & throat (Jawf)", "alif"),
                QaidaItem("ب", "Baa", "Bā'", "Inner part of moist lips coming together", "baa"),
                QaidaItem("ت", "Taa", "Tā'", "Tip of tongue touching the roots of upper front teeth", "taa"),
                QaidaItem("ث", "Thaa", "Thā'", "Tip of tongue touching the edges of upper front teeth", "thaa"),
                QaidaItem("ج", "Jeem", "Jīm", "Middle of the tongue touching the hard palate", "jeem"),
                QaidaItem("ح", "Haa", "Ḥā'", "Middle of the throat (Halq) - clean rasp sound", "haa"),
                QaidaItem("خ", "Khaa", "Khā'", "Top part of the throat near the uvula (Heavy letter)", "khaa"),
                QaidaItem("د", "Daal", "Dāl", "Tip of tongue touching the roots of upper front teeth", "daal"),
                QaidaItem("ذ", "Dhaal", "Dhāl", "Tip of tongue against edges of top incisors", "dhaal"),
                QaidaItem("ر", "Raa", "Rā'", "Tip of tongue slightly rolled near gum ridge", "raa"),
                QaidaItem("ز", "Zaa", "Zāy", "Tip of tongue close to inner surface of lower front teeth", "zaa"),
                QaidaItem("س", "Seen", "Sīn", "Tip of tongue near lower teeth with soft whistle (Safeer)", "seen"),
                QaidaItem("ش", "Sheen", "Shīn", "Middle of tongue with breath spreading (Tafash-shee)", "sheen"),
                QaidaItem("ص", "Saad", "Ṣād", "Heavy letter, tip of tongue near lower front teeth", "saad"),
                QaidaItem("ض", "Daad", "Ḍād", "One or both sides of tongue touching upper molars", "daad"),
                QaidaItem("ط", "Taa", "Ṭā'", "Heavy letter, tip of tongue touching top front tooth base", "ta_heavy"),
                QaidaItem("ظ", "Zhaa", "Ẓā'", "Heavy letter, tip of tongue touching top front tooth edges", "zha_heavy"),
                QaidaItem("ع", "Ain", "'Ayn", "Middle of the throat, squeeze slightly", "ayn"),
                QaidaItem("غ", "Ghain", "Ghayn", "Top part of throat, soft gargle sound (Heavy)", "ghayn"),
                QaidaItem("ف", "Faa", "Fā'", "Edges of top incisors on inside of bottom lip", "faa"),
                QaidaItem("ق", "Qaaf", "Qāf", "Deepest back of tongue with soft palate (Qalqalah)", "qaaf"),
                QaidaItem("ك", "Kaaf", "Kāf", "Back of tongue slightly forward of Qaaf", "kaaf"),
                QaidaItem("ل", "Laam", "Lām", "Front side edge of tongue touching upper gum", "laam"),
                QaidaItem("م", "Meem", "Mīm", "Dry parts of both lips closing gently (Ghunnah)", "meem"),
                QaidaItem("ن", "Noon", "Nūn", "Tip of tongue touching upper gum ridge", "noon"),
                QaidaItem("و", "Waw", "Wāw", "Rounding the lips without full closure", "waw"),
                QaidaItem("ه", "Haa", "Hā'", "Deepest bottom of the throat near chest", "ha_soft"),
                QaidaItem("ء", "Hamzah", "Hamzah", "Deepest bottom of the throat, abrupt stop", "hamzah"),
                QaidaItem("ي", "Yaa", "Yā'", "Middle of the tongue touching the palate", "yaa")
            )
        ),
        QaidaLesson(
            id = 2,
            title = "Lesson 2: Harakat (Short Vowels)",
            titleArabic = "الْحَرَكَات: فَتْحَة، كَسْرَة، ضَمَّة",
            description = "Master the three fundamental short vowels: Fatha (a), Kasra (i), and Damma (u).",
            level = "Beginner",
            items = listOf(
                QaidaItem("بَ", "Baa Fatha", "Ba", "Short open vowel 'a' produced smoothly without stretching", "ba"),
                QaidaItem("بِ", "Baa Kasra", "Bi", "Short down vowel 'i' produced by lowering bottom jaw", "bi"),
                QaidaItem("بُ", "Baa Damma", "Bu", "Short rounded vowel 'u' produced by rounding lips", "bu"),
                QaidaItem("تَ", "Taa Fatha", "Ta", "Open 'Ta' crisp sound", "ta"),
                QaidaItem("تِ", "Taa Kasra", "Ti", "Crisp 'Ti' sound", "ti"),
                QaidaItem("تُ", "Taa Damma", "Tu", "Rounded 'Tu' sound", "tu"),
                QaidaItem("دَ", "Daal Fatha", "Da", "Open 'Da' sound", "da"),
                QaidaItem("دِ", "Daal Kasra", "Di", "Crisp 'Di' sound", "di"),
                QaidaItem("دُ", "Daal Damma", "Du", "Rounded 'Du' sound", "du"),
                QaidaItem("رَ", "Raa Fatha", "Ra", "Heavy open 'Ra' sound", "ra"),
                QaidaItem("رِ", "Raa Kasra", "Ri", "Light crisp 'Ri' sound", "ri"),
                QaidaItem("رُ", "Raa Damma", "Ru", "Heavy rounded 'Ru' sound", "ru")
            )
        ),
        QaidaLesson(
            id = 3,
            title = "Lesson 3: Tanween (Double Vowels)",
            titleArabic = "التَّنْوِين: فَتْحَتَيْن، كَسْرَتَيْن، ضَمَّتَيْن",
            description = "Pronouncing the hidden noon sound in Fathatayn (an), Kasratayn (in), and Dammatayn (un).",
            level = "Elementary",
            items = listOf(
                QaidaItem("بً", "Baa Fathatayn", "Ban", "Produces 'Ban' with light nasal hum", "ban"),
                QaidaItem("بٍ", "Baa Kasratayn", "Bin", "Produces 'Bin' with light nasal hum", "bin"),
                QaidaItem("بٌ", "Baa Dammatayn", "Bun", "Produces 'Bun' with light nasal hum", "bun"),
                QaidaItem("تً", "Taa Fathatayn", "Tan", "Produces 'Tan' with clean nasal resonance", "tan"),
                QaidaItem("تٍ", "Taa Kasratayn", "Tin", "Produces 'Tin' with clean nasal resonance", "tin"),
                QaidaItem("تٌ", "Taa Dammatayn", "Tun", "Produces 'Tun' with clean nasal resonance", "tun")
            )
        ),
        QaidaLesson(
            id = 4,
            title = "Lesson 4: Sukoon & Jazm (Rest)",
            titleArabic = "السُّكُون وَالْجَزْم",
            description = "Connecting a vowelless letter to the preceding vowel cleanly.",
            level = "Elementary",
            items = listOf(
                QaidaItem("أَبْ", "Alif Fatha Baa Sukoon", "Ab", "Letter Baa resting on previous Alif - slight echo (Qalqalah)", "ab"),
                QaidaItem("إِبْ", "Alif Kasra Baa Sukoon", "Ib", "Baa resting with Qalqalah echo", "ib"),
                QaidaItem("أُبْ", "Alif Damma Baa Sukoon", "Ub", "Baa resting with Qalqalah echo", "ub"),
                QaidaItem("أَتْ", "Alif Fatha Taa Sukoon", "At", "Crisp cut of air (Hams) on Taa", "at"),
                QaidaItem("قُلْ", "Qaaf Damma Laam Sukoon", "Qul", "Command 'Say!' - clean connection to Laam", "qul"),
                QaidaItem("مِنْ", "Meem Kasra Noon Sukoon", "Min", "From - Noon resting with Ghunnah potential", "min")
            )
        ),
        QaidaLesson(
            id = 5,
            title = "Lesson 5: Tashdeed / Shaddah",
            titleArabic = "الشَّدَّة وَالتَّشْدِيد",
            description = "Doubling of a consonant where the first is silent and the second holds a vowel.",
            level = "Intermediate",
            items = listOf(
                QaidaItem("أَبَّ", "Abba", "Abba", "First Baa silent, second vocalized with Fatha", "abba"),
                QaidaItem("أَبِّ", "Abbi", "Abbi", "First Baa silent, second vocalized with Kasra", "abbi"),
                QaidaItem("أَبُّ", "Abbu", "Abbu", "First Baa silent, second vocalized with Damma", "abbu"),
                QaidaItem("إِنَّ", "Inna", "Inna", "Noon Mushaddadah - holds 2 counts of Ghunnah (nasal glow)", "inna"),
                QaidaItem("ثُمَّ", "Thumma", "Thumma", "Meem Mushaddadah - holds 2 counts of Ghunnah", "thumma")
            )
        )
    )

    val tajweedRules: List<TajweedRule> = listOf(
        TajweedRule(
            id = "noon_izhar",
            title = "Izhar (Clear Pronunciation)",
            titleArabic = "الإِظْهَار الحَلْقِي",
            category = "Noon Saakin & Tanween",
            explanation = "Pronouncing the Noon Saakin or Tanween clearly without any humming or stretching when followed by one of the 6 throat letters: Hamzah (ء), Haa (هـ), Ayn (ع), Haa (ح), Ghayn (غ), Khaa (خ).",
            examples = listOf(
                TajweedExample("مَنْ آمَنَ", "نْ آ", "Man āmana", "Noon Saakin followed by Hamzah -> Pronounce 'Man' crisp and clear."),
                TajweedExample("عَنْهُمْ", "نْ هُ", "'Anhum", "Noon Saakin followed by Haa -> Clear 'An' without nasal lingering."),
                TajweedExample("سَلَامٌ هِيَ", "مٌ هِ", "Salāmun hiya", "Tanween followed by Haa -> Clear 'un' sound.")
            )
        ),
        TajweedRule(
            id = "noon_idgham",
            title = "Idgham (Merging)",
            titleArabic = "الإِدْغَام بِغُنَّة وَبِغَيْر غُنَّة",
            category = "Noon Saakin & Tanween",
            explanation = "Merging the Noon Saakin or Tanween into the next letter. Letters of Idgham are Yarmaloon (ي، ر، م، ل، و، ن). Merged with Ghunnah (nasal tone) on (ي، ن، م، و), and without Ghunnah on (ل، ر).",
            examples = listOf(
                TajweedExample("مَن يَقُولُ", "ن ي", "May-yaqūlu", "Noon completely merges into Yaa with a soft 2-beat nasal resonance."),
                TajweedExample("مِن مَّالٍ", "ن مَّ", "Mim-mālin", "Noon blends seamlessly into Meem."),
                TajweedExample("مِّن رَّبِّهِمْ", "ن رَّ", "Mir-Rabbihim", "Idgham without Ghunnah: Noon merges into Raa cleanly.")
            )
        ),
        TajweedRule(
            id = "noon_iqlab",
            title = "Iqlab (Conversion to Meem)",
            titleArabic = "الإِقْلَاب",
            category = "Noon Saakin & Tanween",
            explanation = "Changing the sound of Noon Saakin or Tanween into a gentle Meem with Ghunnah when followed by the letter Baa (ب). Indicated in the Mushaf by a small Meem (مـ).",
            examples = listOf(
                TajweedExample("مِن بَعْدِ", "نۢ بَ", "Mim-ba'di", "The Noon changes to a smooth Meem before Baa."),
                TajweedExample("سَمِيعٌ بَصِيرٌ", "عٌۢ بَ", "Samī'um-baṣīr", "Tanween becomes Meem with closed-lip Ghunnah.")
            )
        ),
        TajweedRule(
            id = "noon_ikhfa",
            title = "Ikhfa (Concealment)",
            titleArabic = "الإِخْفَاء الحَقِيقِي",
            category = "Noon Saakin & Tanween",
            explanation = "Concealing the Noon Saakin or Tanween between Izhar and Idgham with a gentle 2-count nasal tone before any of the remaining 15 letters (ت، ث، ج، د، ذ، ز، س، ش، ص، ض، ط، ظ، ف، ق، ك).",
            examples = listOf(
                TajweedExample("مِن قَبْلُ", "ن قَ", "Min-qablu", "Tongue prepares for Qaaf while nasal air flows 2 counts."),
                TajweedExample("كُنتُمْ", "ن تُ", "Kuntum", "Concealed Noon before Taa."),
                TajweedExample("عَذَابٌ شَدِيدٌ", "بٌ شَ", "'Adhābun shadīd", "Concealed Tanween before Sheen.")
            )
        ),
        TajweedRule(
            id = "qalqalah",
            title = "Qalqalah (Echo / Bounce)",
            titleArabic = "القَلْقَلَة",
            category = "Articulation Rules",
            explanation = "An echoing vibration produced when pronouncing the 5 Qalqalah letters (ق، ط، ب، ج، د - grouped as Qutb Jad) when they carry a Sukoon or when stopping on them.",
            examples = listOf(
                TajweedExample("قُلْ هُوَ اللَّهُ أَحَدٌ", "دْ", "Aḥad(e)", "Echo bounce on Daal when pausing at verse end (Kubra)."),
                TajweedExample("الْفَلَقِ", "قْ", "Al-Falaq(e)", "Strong rebound on Qaaf at end of ayah."),
                TajweedExample("يَجْعَلُونَ", "جْ", "Yaj'alūn", "Light internal bounce on Jeem with Sukoon (Sughra).")
            )
        ),
        TajweedRule(
            id = "ghunnah",
            title = "Ghunnah (Nasalization)",
            titleArabic = "الغُنَّة",
            category = "Nasal Rules",
            explanation = "A resonant, melodious sound emitted exclusively from the nasal passage (Khayshoom). Compulsory for 2 counts on Noon and Meem when they have a Shaddah (نّ، مّ).",
            examples = listOf(
                TajweedExample("إِنَّ اللَّهَ", "نَّ", "Inna-llāh", "Full 2 counts of melodious nasal tone on Noon."),
                TajweedExample("عَمَّ يَتَسَاءَلُونَ", "مَّ", "'Amma yatasā'alūn", "2 counts of nasal tone on Meem Mushaddadah.")
            )
        )
    )

    val dailyDuas: List<DuaItem> = listOf(
        DuaItem(
            id = "dua_waking",
            title = "Upon Waking Up",
            category = "Daily Morning",
            arabic = "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            transliteration = "Al-ḥamdu lillāhil-ladhī aḥyānā ba'da mā amātanā wa ilayhin-nushūr",
            translation = "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
            benefit = "Sahih Bukhari. Expresses gratitude for a fresh day of life and faith."
        ),
        DuaItem(
            id = "dua_knowledge",
            title = "Dua for Knowledge & Understanding",
            category = "Quran & Study",
            arabic = "رَّبِّ زِدْنِي عِلْمًا",
            transliteration = "Rabbi zidnī 'ilmā",
            translation = "My Lord, increase me in knowledge.",
            benefit = "Surah Ta-Ha, 114. The Prophet's recommended prayer before Quran lessons."
        ),
        DuaItem(
            id = "dua_sleep",
            title = "Before Sleeping",
            category = "Night Azkar",
            arabic = "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
            transliteration = "Bismika Allāhumma amūtu wa aḥyā",
            translation = "In Your name, O Allah, I die and I live.",
            benefit = "Sahih Muslim. Enters sleep under the protection and remembrance of Allah."
        ),
        DuaItem(
            id = "dua_forgiveness",
            title = "Master of Seeking Forgiveness (Sayyidul Istighfar)",
            category = "Forgiveness",
            arabic = "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
            transliteration = "Allāhumma Anta Rabbī lā ilāha illā Anta, khalaqtanī wa anā 'abduka...",
            translation = "O Allah, You are my Lord, none has the right to be worshiped but You. You created me and I am Your servant...",
            benefit = "Whoever recites it with certainty will be among the people of Paradise (Bukhari)."
        )
    )

    val hadiths: List<Pair<String, String>> = listOf(
        "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" to "The best among you are those who learn the Quran and teach it. (Sahih al-Bukhari)",
        "الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ" to "The one who is proficient in the recitation of the Quran will be with the noble, honorable scribes (angels). (Sahih Muslim)",
        "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ" to "Actions are judged by their intentions, and every person will get the reward according to what he intended. (Sahih al-Bukhari)"
    )
}
