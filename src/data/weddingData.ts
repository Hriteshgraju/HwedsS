export interface BilingualInvitationData {
  invocation: {
    en: string;
    kn: string;
  };
  panchanga: {
    en: string;
    kn: string;
  };
  hosts: {
    en: {
      names: string;
      lineage: string;
      addressLine1: string;
      addressLine2: string;
      invitationProse: string;
    };
    kn: {
      names: string;
      lineage: string;
      addressLine1: string;
      addressLine2: string;
      invitationProse: string;
    };
  };
  bride: {
    en: {
      prefix: string;
      name: string;
      qualification: string;
      parents: string;
      hometown: string;
    };
    kn: {
      prefix: string;
      name: string;
      qualification: string;
      parents: string;
      hometown: string;
    };
  };
  groom: {
    en: {
      prefix: string;
      name: string;
      qualification: string;
      parents: string;
      address: string;
    };
    kn: {
      prefix: string;
      name: string;
      qualification: string;
      parents: string;
      address: string;
    };
  };
  venue: {
    en: {
      dateHeader: string;
      hallName: string;
      addressLine1: string;
      addressLine2: string;
      googleMapsQuery: string;
      landmarks: string[];
    };
    kn: {
      dateHeader: string;
      hallName: string;
      addressLine1: string;
      addressLine2: string;
    };
  };
  events: {
    reception: {
      en: {
        title: string;
        date: string;
        day: string;
        time: string;
        description: string;
        attire: string;
      };
      kn: {
        title: string;
        date: string;
        day: string;
        time: string;
        description: string;
      };
    };
    muhurtham: {
      en: {
        title: string;
        date: string;
        day: string;
        time: string;
        lagna: string;
        description: string;
        attire: string;
      };
      kn: {
        title: string;
        date: string;
        day: string;
        time: string;
        lagna: string;
        description: string;
      };
    };
  };
  awaitingPresence: {
    en: {
      heading: string;
      line1: string;
      line2: string;
    };
    kn: {
      heading: string;
      line1: string;
      line2: string;
    };
  };
  compliments: {
    en: {
      heading: string;
      line: string;
    };
    kn: {
      heading: string;
      line: string;
    };
  };
}

export const WEDDING_INVITATION_DATA: BilingualInvitationData = {
  invocation: {
    en: '|| Sri Lakshmi Thimmaraya Swamy Prasanna ||',
    kn: '|| ಶ್ರೀ ಲಕ್ಷ್ಮೀ ತಿಮ್ಮರಾಯ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ ||',
  },
  panchanga: {
    en: 'Swasti Sri Vijayabhyudaya Shalivahana Shaka 1948 · Sri Parabhava Nama Samvatsara · Dakshinayana · Karthika Masa · Shukla Paksha Dashami · Guruvara · Auspicious Dhanur Lagna',
    kn: 'ಸ್ವಸ್ತಿಶ್ರೀ ವಿಜಯಾಭ್ಯುದಯ ಶಾಲಿವಾಹನ ಶಕೆ 1948ನೇ ಶ್ರೀ ಪರಾಭವ ನಾಮ ಸಂವತ್ಸರದ ದಕ್ಷಿಣಾಯಣ ಕಾರ್ತೀಕ ಮಾಸ ಶುಕ್ಲ ಪಕ್ಷ ದಶಮಿ ದಿನಾಂಕ 19-11-2026ನೇ ಗುರುವಾರ ಬೆಳಿಗ್ಗೆ 9.15 ರಿಂದ 10.10 ಗಂಟೆಯೊಳಗೆ ಸಲ್ಲುವ ಧನುರ್ ಲಗ್ನದ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ',
  },
  hosts: {
    en: {
      names: 'Smt. M. Radhamma & Late Sri T. Hanumahai',
      lineage: '(S/o. Smt. Thimmakka & Late Sri Thimmarayappa)',
      addressLine1: 'Seekayanahalli, Vishwanathapura Post, Kundana Hobli,',
      addressLine2: 'Devanahalli Taluk, Bangalore Rural - 562110',
      invitationProse:
        'Cordially invite your gracious presence with family & friends on the auspicious occasion of the wedding of our daughter',
    },
    kn: {
      names: 'ಶ್ರೀಮತಿ ಎಂ. ರಾಧಮ್ಮ ಮತ್ತು ದಿ|| ಶ್ರೀ ಟಿ. ಹನುಮಯ್ಯ',
      lineage: '(ಶ್ರೀಮತಿ ತಿಮ್ಮಕ್ಕ ಮತ್ತು ದಿ|| ಶ್ರೀ ತಿಮ್ಮರಾಯಪ್ಪ ರವರ ಪುತ್ರ)',
      addressLine1: 'ಸೀಕಾಯನಹಳ್ಳಿ, ವಿಶ್ವನಾಥಪುರ ಅಂಚೆ, ಕುಂದಾನ ಹೋಬಳಿ,',
      addressLine2: 'ದೇವನಹಳ್ಳಿ ತಾಲ್ಲೂಕು, ಬೆಂಗಳೂರು ಗ್ರಾಂ. ಜಿಲ್ಲೆ - 562110',
      invitationProse: 'ಇವರು ಮಾಡುವ ವಿಜ್ಞಾಪನೆಗಳು — ನಮ್ಮ ಪುತ್ರಿ',
    },
  },
  bride: {
    en: {
      prefix: 'Chi. Sou.',
      name: 'Sowmya H',
      qualification: 'B.E',
      parents: 'D/o. Smt. M. Radhamma & Late Sri T. Hanumahai',
      hometown: 'Seekayanahalli, Devanahalli Taluk, Bangalore Rural',
    },
    kn: {
      prefix: 'ಚಿ||ಕುಂ||ಸೌ||',
      name: 'ಸೌಮ್ಯ. ಹೆಚ್',
      qualification: 'B.E',
      parents: 'ಶ್ರೀಮತಿ ಎಂ. ರಾಧಮ್ಮ ಮತ್ತು ದಿ|| ಶ್ರೀ ಟಿ. ಹನುಮಯ್ಯ ರವರ ಪುತ್ರಿ',
      hometown: 'ಸೀಕಾಯನಹಳ್ಳಿ, ದೇವನಹಳ್ಳಿ ತಾಲ್ಲೂಕು',
    },
  },
  groom: {
    en: {
      prefix: 'Chi. Ry.',
      name: 'Hritesh G. Raju',
      qualification: 'B.E',
      parents: 'S/o. Smt. Mani Bai & Sri Govindaraju N (Ex. Army)',
      address: 'Shakthidhama, Virupina Koppa, Shivamogga - 577204',
    },
    kn: {
      prefix: 'ಚಿ||ರಾ||',
      name: 'ಹೃತೇಶ್ ಜಿ. ರಾಜು',
      qualification: 'B.E',
      parents: 'ಶ್ರೀಮತಿ ಮಣಿ ಬಾಯಿ ಮತ್ತು ಶ್ರೀ ಗೋವಿಂದರಾಜು ಎನ್. (ಮಾಜಿ ಸೈನಿಕ) ರವರ ಪುತ್ರ',
      address: 'ಶಕ್ತಿಧಾಮ, ವಿರುಪಿನಕೊಪ್ಪ, ಶಿವಮೊಗ್ಗ - 577204',
    },
  },
  venue: {
    en: {
      dateHeader: 'On Thursday, 19th November 2026 at',
      hallName: 'Arya Edigara Bhavana Sangha',
      addressLine1: 'Ashok Nagar Main Road, Beside Helipad, Police Quarters,',
      addressLine2: 'Shivamogga - 577205',
      googleMapsQuery: 'Arya+Edigara+Bhavana+Sangha+Ashok+Nagar+Main+Road+Shivamogga+577205',
      landmarks: [
        'Directly beside the City Helipad Ground & Police Quarters',
        '10 mins (3.4 km) from Shivamogga Town Railway Station (SMET)',
        '8 mins (2.6 km) from KSRTC Central Bus Terminal, Shivamogga',
        'Ample complimentary parking available within the Bhavana premises',
      ],
    },
    kn: {
      dateHeader: 'ಇವರ ವಿವಾಹ ಮಹೋತ್ಸವವನ್ನು',
      hallName: 'ಆರ್ಯ ಈಡಿಗರ ಭವನ ಸಂಘ',
      addressLine1: 'ಅಶೋಕನಗರ ಮುಖ್ಯ ರಸ್ತೆ, ಹೆಲಿಪ್ಯಾಡ್ ಹತ್ತಿರ, ಪೊಲೀಸ್ ಕ್ವಾರ್ಟರ್ಸ್,',
      addressLine2: 'ಶಿವಮೊಗ್ಗ - 577205',
    },
  },
  events: {
    reception: {
      en: {
        title: 'Reception',
        date: '18-11-2026',
        day: 'Wednesday',
        time: '7:00 pm onwards',
        description:
          'An evening of warm introductions, floral blessings, classical instrumental melodies, and a grand festive dinner welcoming both families and friends.',
        attire: 'Traditional Silk Sarees, Sherwanis, or Formal Evening Attire',
      },
      kn: {
        title: 'ಆರತಕ್ಷತೆ',
        date: '18-11-2026',
        day: 'ಬುಧವಾರ',
        time: 'ಸಂಜೆ 7.00 ರಿಂದ',
        description: 'ಬಾಂಧವರ ಸಮ್ಮಿಲನ, ನವಜೋಡಿಗೆ ಶುಭಾಶೀರ್ವಾದ ಹಾಗೂ ಭೋಜನ ಕೂಟ.',
      },
    },
    muhurtham: {
      en: {
        title: 'Muhurtham',
        date: '19-11-2026',
        day: 'Thursday',
        time: '9:15 am to 10:10 am',
        lagna: 'Lagna: Dhanur',
        description:
          'Sacred Vedic wedding rituals, Kashi Yatre, Jeerige Bella, Mangalya Dharana during the auspicious Dhanur Lagna, and Saptapadi followed by traditional banana-leaf Sadhya feast.',
        attire: 'South Indian Traditional Kanjeevaram / Mysore Silk & Veshti',
      },
      kn: {
        title: 'ಮುಹೂರ್ತ',
        date: '19-11-2026',
        day: 'ಗುರುವಾರ',
        time: 'ಬೆಳಿಗ್ಗೆ 9.15 ರಿಂದ 10.10',
        lagna: 'ಲಗ್ನ: ಧನುರ್',
        description: 'ಧನುರ್ ಲಗ್ನದ ಶುಭ ಮುಹೂರ್ತದಲ್ಲಿ ಮಾಂಗಲ್ಯ ಧಾರಣೆ ಹಾಗೂ ಸಾಂಪ್ರದಾಯಿಕ ವಿವಾಹ ವಿಧಿವಿಧಾನಗಳು.',
      },
    },
  },
  awaitingPresence: {
    en: {
      heading: 'Awaiting your gracious presence:',
      line1: 'Smt. M. Radhamma & Late Sri T. Hanumahai and Family',
      line2: 'Smt. Jayashree & Sri Harish Kumar H.S.',
    },
    kn: {
      heading: 'ತಮ್ಮ ಆಗಮನಾಭಿಲಾಷಿಗಳು:',
      line1: 'ಶ್ರೀಮತಿ ಎಂ. ರಾಧಮ್ಮ ಮತ್ತು ದಿ|| ಶ್ರೀ ಟಿ. ಹನುಮಯ್ಯರವರ ಕುಟುಂಬ',
      line2: 'ಶ್ರೀಮತಿ ಜಯಶ್ರೀ ಮತ್ತು ಶ್ರೀ ಹರೀಶ್ ಕುಮಾರ್ ಹೆಚ್.ಎಸ್.',
    },
  },
  compliments: {
    en: {
      heading: 'With Best Compliments From:',
      line: 'Late Sri Thimmarayappa Family, Relatives & Friends',
    },
    kn: {
      heading: 'ತಮ್ಮ ಸುಖಾಗಮನವನ್ನು ಬಯಸುವವರು:',
      line: 'ದಿ|| ಶ್ರೀ ತಿಮ್ಮರಾಯಪ್ಪ ಕುಟುಂಬದವರು ಹಾಗೂ ಬಂಧು-ಮಿತ್ರರು',
    },
  },
};


