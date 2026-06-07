// ============================================================
// TIPU ATAU BETUL? — Full Game Logic v2.0
// Template Engine + Infinite Generation
// ============================================================


// ============================================================
// 1. UTILITIES
// ============================================================

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickDiff(obj, diff) {
  return pickRandom(obj[diff]);
}

function formatRM(n) {
  return 'RM ' + Math.max(0, n).toLocaleString();
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) {
    s.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}


// ============================================================
// 2. VICTIM POOL
// ============================================================

var victims = [
  { emoji: '👵', name: 'Mak Cik Rosnah',  details: '65 years old • Retired Homemaker • Kota Bharu'    },
  { emoji: '👴', name: 'Pak Cik Hamid',    details: '68 years old • Government Retiree • Johor Bahru'  },
  { emoji: '👩', name: 'Puan Salmah',      details: '52 years old • Schoolteacher • Ipoh'              },
  { emoji: '🧑', name: 'Farah',            details: '22 years old • University Student • Shah Alam'     },
  { emoji: '👨', name: 'Encik Rizal',      details: '35 years old • Grab Driver • Kuala Lumpur'        },
  { emoji: '👩', name: 'Dr. Zainab',       details: '45 years old • Medical Officer • KLCC'            },
  { emoji: '👨', name: 'Encik Farouk',     details: '50 years old • Businessman • Johor'               },
  { emoji: '👴', name: 'Pak Cik Ahmad',    details: '58 years old • Retired Police Officer • Melaka'   },
  { emoji: '👨', name: 'Encik Hafiz',      details: '28 years old • IT Engineer • Selangor'            },
  { emoji: '👩', name: 'Puan Nadia',       details: '32 years old • Accountant • Kuala Lumpur'         },
  { emoji: '🧑', name: 'Syafiq',           details: '26 years old • Fresh Graduate • Cyberjaya'        },
  { emoji: '👩', name: 'Puan Liyana',      details: '29 years old • Entrepreneur • Subang Jaya'        },
  { emoji: '👨', name: 'Encik Zulkifli',   details: '42 years old • Company Manager • Petaling Jaya'  },
  { emoji: '👩', name: 'Cik Aisyah',       details: '24 years old • Degree Student • Pulau Pinang'    },
  { emoji: '👴', name: 'Encik Rauf',       details: '62 years old • Army Retiree • Kota Bharu'        },
  { emoji: '👨', name: 'Encik Kamal',      details: '45 years old • Finance Manager • Putrajaya'       },
  { emoji: '👩', name: 'Puan Rohani',      details: '48 years old • HR Manager • Cyberjaya'            },
  { emoji: '🧑', name: 'Adik Amira',       details: '17 years old • SPM Student • Selangor'            },
  { emoji: '👨', name: 'Encik Danial',     details: '31 years old • Accountant • Bangsar'              },
  { emoji: '👩', name: 'Puan Suraya',      details: '38 years old • Nurse • Hospital Kuala Lumpur'     },
  { emoji: '🧑', name: 'Luqman',           details: '18 years old • SPM Leaver • Kedah'               },
  { emoji: '👩', name: 'Cik Balqis',       details: '23 years old • Fresh Graduate • UPM'             },
  { emoji: '👨', name: 'Encik Syazwan',    details: '27 years old • Marketing Executive • KL'         },
  { emoji: '👩', name: 'Puan Hasnah',      details: '52 years old • Retired Teacher • Ampang'         }
];


// ============================================================
// 3. SCENARIO TEMPLATES
// ============================================================

var templates = [

  // --- SCAM: Bank Phishing ---
  {
    id: 'bank_phishing',
    answer: 'scam',
    category: 'Bank Phishing',
    badgeClass: 'badge-phishing',
    weight: 10,
    generate: function(diff) {
      var bank   = pickRandom(['Maybank', 'CIMB', 'Public Bank', 'RHB', 'BSN', 'Hong Leong Bank', 'AmBank']);
      var action = pickRandom(['suspended', 'flagged for suspicious activity', 'temporarily locked', 'frozen due to unusual login']);
      var time   = pickRandom(['24 hours', '48 hours', '12 hours', '6 hours']);
      var url    = pickDiff({
        easy:   ['maybank-secure-verify.com', 'cimb-login-secure.net', 'publicbank-verify.blogspot.com', 'rhb-secure-login.net'],
        normal: ['maybank2u-secure-verify.com', 'cimb2u-account-verify.net', 'publicbank2u-secure.com', 'rhbnow-verify-account.com'],
        hard:   ['maybank2u.com.net', 'cimb-clicks.com.ph', 'm-maybank2u.com', 'publicbank2u.com.my.verify.net']
      }, diff);
      var loss = { easy: 400, normal: 1200, hard: 3500 }[diff];
      return {
        label:       '📱 SMS from Bank',
        text:        bank + ': Your account has been ' + action + '. Verify your identity at ' + url + ' within ' + time + ' or your account will be permanently closed.',
        hint:        url,
        explanation: 'THIS IS A SCAM. ' + bank + ' never sends verification links via SMS. "' + url + '" is not ' + bank + '\'s official website. Real bank SMS alerts never contain links to external sites.',
        loss:        loss,
        falseLoss:   200
      };
    }
  },

  // --- SCAM: Prize / Lucky Draw ---
  {
    id: 'prize_scam',
    answer: 'scam',
    category: 'Fake Prize',
    badgeClass: 'badge-phishing',
    weight: 9,
    generate: function(diff) {
      var platform = pickRandom(['Shopee', 'Lazada', 'TnG eWallet', 'GrabFood', 'Astro', 'Watsons']);
      var amount   = pickRandom(['RM500', 'RM1,000', 'RM2,500', 'RM5,000', 'RM10,000']);
      var timer    = pickRandom(['1 hour', '30 minutes', '2 hours', '24 hours']);
      var url      = pickDiff({
        easy:   ['shopee-winner-prize.blogspot.com', 'lazada-lucky-draw.net', 'tng-reward-winner.blogspot.com'],
        normal: ['shopee-lucky-MY-claim.com', 'lazada-reward-claim.net', 'tng-ewallet-winner.com'],
        hard:   ['shopee.com.my-prize.net', 'lazada.com.my.winner.cc', 'tng.com.my-reward.net']
      }, diff);
      var loss = { easy: 300, normal: 900, hard: 2500 }[diff];
      return {
        label:       '📱 WhatsApp',
        text:        'Congratulations! You have won a ' + platform + ' voucher worth ' + amount + '! Claim now at: ' + url + '. Offer expires in ' + timer + '!',
        hint:        url,
        explanation: 'THIS IS A SCAM. ' + platform + ' does not give out random prizes via WhatsApp. "' + url + '" is not ' + platform + '\'s official website. The expiry countdown of ' + timer + ' is a pressure tactic designed to stop you from thinking clearly.',
        loss:        loss,
        falseLoss:   180
      };
    }
  },

  // --- SCAM: Macau Scam ---
  {
    id: 'macau_scam',
    answer: 'scam',
    category: 'Macau Scam',
    badgeClass: 'badge-macau',
    weight: 10,
    generate: function(diff) {
      var agency  = pickRandom(['Royal Malaysia Police (PDRM)', 'Malaysian Anti-Corruption Commission (MACC)', 'Bank Negara Malaysia', 'Royal Malaysian Customs (JKDM)', 'Immigration Department of Malaysia']);
      var crime   = pickRandom(['money laundering', 'drug trafficking', 'illegal fund transfers', 'customs smuggling', 'tax evasion']);
      var amount  = pickDiff({
        easy:   ['RM500', 'RM800', 'RM1,000', 'RM1,500'],
        normal: ['RM2,000', 'RM3,000', 'RM4,000', 'RM5,000'],
        hard:   ['RM8,000', 'RM10,000', 'RM12,000', 'RM15,000']
      }, diff);
      var phrase  = 'transfer ' + amount + ' to a safe account';
      var loss    = { easy: 600, normal: 2500, hard: 6000 }[diff];
      return {
        label:       '📞 Phone Call (transcript)',
        text:        'This is the ' + agency + '. Your name has been linked to a ' + crime + ' case. To clear your name, you must ' + phrase + ' for our investigation. Do not tell anyone or you will be arrested immediately.',
        hint:        phrase,
        explanation: 'THIS IS A SCAM. The ' + agency + ' never asks citizens to transfer money over the phone. "Transfer to a safe account" is the exact phrase used in the Macau Scam. The instruction to keep it secret is a key manipulation tactic. Hang up and call PDRM at 999 to verify.',
        loss:        loss,
        falseLoss:   200
      };
    }
  },

  // --- SCAM: Love Scam ---
  {
    id: 'love_scam',
    answer: 'scam',
    category: 'Love Scam',
    badgeClass: 'badge-love',
    weight: 8,
    generate: function(diff) {
      var name       = pickRandom(['Sarah', 'Amanda', 'Cynthia', 'Jessica', 'Linda', 'Rachel', 'Michelle', 'Daniel', 'Kevin', 'James']);
      var origin     = pickRandom(['Hong Kong', 'Singapore', 'London', 'Dubai', 'Sydney', 'Taipei', 'Seoul']);
      var profession = pickRandom(['doctor', 'engineer', 'financial consultant', 'architect', 'business owner']);
      var opener     = pickRandom(['wrong number', 'accidentally added you', 'found your profile online']);
      var phrase     = 'investment opportunity';
      var loss       = { easy: 300, normal: 1800, hard: 4500 }[diff];
      return {
        label:       '📱 WhatsApp',
        text:        'Hi, sorry for the ' + opener + '! My name is ' + name + ' from ' + origin + ', currently working as a ' + profession + ' in KL. Since we\'re connected, I wanted to share an ' + phrase + ' that has been giving me incredible returns lately.',
        hint:        phrase,
        explanation: 'THIS IS A SCAM. A stranger contacting you by "' + opener + '" and immediately mentioning an "investment opportunity" is the opening script of a Love Scam. They will build trust over days, then ask for money. Block and report immediately.',
        loss:        loss,
        falseLoss:   180
      };
    }
  },

  // --- SCAM: Job Scam ---
  {
    id: 'job_scam',
    answer: 'scam',
    category: 'Fake Job',
    badgeClass: 'badge-job',
    weight: 9,
    generate: function(diff) {
      var job    = pickRandom(['Data Entry Specialist', 'Social Media Manager', 'Online Reviewer', 'Digital Marketing Assistant', 'Customer Support Agent', 'Content Moderator']);
      var salary = pickDiff({
        easy:   ['RM200 per day', 'RM3,000 per month', 'RM150 per day'],
        normal: ['RM4,500 per month', 'RM6,000 per month', 'RM250 per day'],
        hard:   ['RM7,500 per month', 'RM5,500 per month', 'RM300 per day']
      }, diff);
      var fee    = pickRandom(['RM150', 'RM200', 'RM300', 'RM350', 'RM500']);
      var phrase = 'pay a registration fee of ' + fee;
      var loss   = { easy: 300, normal: 900, hard: 2500 }[diff];
      return {
        label:       '📱 WhatsApp',
        text:        'Work from home as a ' + job + '! Earn ' + salary + ' with flexible hours. No experience required. To activate your account, simply ' + phrase + ' and start immediately.',
        hint:        phrase,
        explanation: 'THIS IS A SCAM. Legitimate employers never ask you to pay to start working. "' + phrase + '" is the red flag. A salary of ' + salary + ' for basic online tasks is unrealistic and designed to attract desperate job seekers.',
        loss:        loss,
        falseLoss:   180
      };
    }
  },

  // --- SCAM: Investment Scam ---
  {
    id: 'investment_scam',
    answer: 'scam',
    category: 'Investment Scam',
    badgeClass: 'badge-investment',
    weight: 9,
    generate: function(diff) {
      var type    = pickRandom(['gold', 'cryptocurrency', 'forex', 'Islamic digital gold', 'digital assets', 'unit trust']);
      var returns = pickDiff({
        easy:   ['100%', '80%', '50%', '200%'],
        normal: ['30%', '40%', '35%', '25%'],
        hard:   ['12%', '15%', '18%', '20%']
      }, diff);
      var period  = pickRandom(['3 months', '30 days', '60 days', '90 days']);
      var minimum = pickRandom(['RM500', 'RM1,000', 'RM2,000', 'RM3,000']);
      var phrase  = 'GUARANTEED returns of ' + returns;
      var loss    = { easy: 500, normal: 2000, hard: 5500 }[diff];
      return {
        label:       '📱 WhatsApp',
        text:        'Exclusive ' + type + ' investment! ' + phrase + ' within ' + period + '. Minimum investment only ' + minimum + '. Limited slots available. Many of our members have already withdrawn profits. Join now before it closes!',
        hint:        phrase,
        explanation: 'THIS IS A SCAM. No legitimate investment "guarantees" returns of ' + returns + ' in ' + period + '. The word GUARANTEED in any investment offer is always a red flag. Only invest through institutions licensed by Bank Negara Malaysia. Check bnm.gov.my before investing anywhere.',
        loss:        loss,
        falseLoss:   180
      };
    }
  },

  // --- SCAM: Delivery Smishing ---
  {
    id: 'delivery_scam',
    answer: 'scam',
    category: 'Smishing',
    badgeClass: 'badge-smishing',
    weight: 8,
    generate: function(diff) {
      var courier = pickRandom(['Poslaju', 'J&T Express', 'DHL Malaysia', 'Ninja Van']);
      var issue   = pickRandom(['incomplete delivery address', 'customs clearance required', 'failed delivery attempt', 'address verification needed']);
      var fee     = pickRandom(['RM2.50', 'RM5.00', 'RM8.50', 'RM12.00', 'RM15.00']);
      var url     = pickDiff({
        easy:   ['poslaju-redelivery.com', 'jnt-tracking.blogspot.com', 'dhl-redelivery-claim.net'],
        normal: ['poslaju-my-delivery.com', 'jnt-express-delivery.net', 'dhl-malaysia-redeliver.com'],
        hard:   ['pos.com.my-redelivery.net', 'jntexpress.com.my.track.cc', 'dhl.com.my.redelivery.net']
      }, diff);
      var loss = { easy: 250, normal: 700, hard: 2000 }[diff];
      return {
        label:       '📱 SMS from Courier',
        text:        courier + ': Your parcel could not be delivered due to ' + issue + '. Pay ' + fee + ' for redelivery at: ' + url,
        hint:        url,
        explanation: 'THIS IS A SCAM. ' + courier + ' does not request payments via SMS links. "' + url + '" is not ' + courier + '\'s official website. This technique is called smishing (SMS phishing). Always verify through the official ' + courier + ' app or website directly.',
        loss:        loss,
        falseLoss:   150
      };
    }
  },

  // --- SCAM: Impersonation ---
  {
    id: 'impersonation_scam',
    answer: 'scam',
    category: 'Impersonation Scam',
    badgeClass: 'badge-impersonation',
    weight: 8,
    generate: function(diff) {
      var relation = pickRandom(['brother', 'sister', 'best friend', 'cousin', 'colleague']);
      var reason   = pickRandom(['my phone screen cracked', 'I lost my phone', 'my phone got stolen', 'my phone is being repaired']);
      var amount   = pickDiff({
        easy:   ['RM200', 'RM300', 'RM500'],
        normal: ['RM500', 'RM800', 'RM1,000'],
        hard:   ['RM1,200', 'RM1,500', 'RM2,000']
      }, diff);
      var phrase   = 'don\'t tell anyone yet';
      var loss     = { easy: 300, normal: 1000, hard: 3000 }[diff];
      return {
        label:       '📱 WhatsApp (unknown number)',
        text:        'Hey, it\'s your ' + relation + '. ' + reason.charAt(0).toUpperCase() + reason.slice(1) + ', using a new number for now. Can you transfer ' + amount + ' urgently? I\'ll explain everything later, just please ' + phrase + '.',
        hint:        phrase,
        explanation: 'THIS IS A SCAM. Scammers impersonate people close to you using unknown numbers. The phrase "' + phrase + '" is designed to stop you from verifying with someone else. Always call your ' + relation + ' on their known number to confirm before transferring any money.',
        loss:        loss,
        falseLoss:   200
      };
    }
  },

  // --- REAL: Bank Transaction Notification ---
  {
    id: 'real_bank_notif',
    answer: 'real',
    category: 'Legitimate Message',
    badgeClass: 'badge-legit',
    weight: 5,
    generate: function(diff) {
      var bankData = {
        'Maybank':         '1300-88-6688',
        'CIMB':            '1300-880-900',
        'Public Bank':     '1800-22-5555',
        'RHB':             '03-9206-8118',
        'Hong Leong Bank': '03-7626-8899'
      };
      var bankNames = Object.keys(bankData);
      var bank      = pickRandom(bankNames);
      var hotline   = bankData[bank];
      var merchant  = pickRandom(['KFC Pavilion KL', 'McDonald\'s Sunway Pyramid', 'Starbucks KLCC', 'AEON Big Cheras', 'Guardian Pharmacy', 'Parkson Mid Valley']);
      var amount    = (Math.floor(Math.random() * 120) + 10) + '.00';
      var balance   = (Math.floor(Math.random() * 3000) + 400) + '.60';
      var today     = new Date();
      var dateStr   = String(today.getDate()).padStart(2,'0') + '/' + String(today.getMonth()+1).padStart(2,'0') + '/' + today.getFullYear();
      var loss      = { easy: 200, normal: 400, hard: 800 }[diff];
      return {
        label:       '📱 SMS from Bank',
        text:        bank + ': RM' + amount + ' debited from your account on ' + dateStr + ' at ' + merchant + '. Balance: RM' + balance + '. Not your transaction? Call ' + hotline + '.',
        hint:        hotline,
        explanation: 'THIS IS LEGITIMATE. This is a standard bank debit notification. There are no external links, no suspicious URLs, and ' + hotline + ' is the official ' + bank + ' customer service number. Real bank SMS notifications only contain transaction details and their hotline.',
        loss:        loss,
        falseLoss:   loss
      };
    }
  },

  // --- REAL: Government Notice ---
  {
    id: 'real_gov_notice',
    answer: 'real',
    category: 'Legitimate Message',
    badgeClass: 'badge-legit',
    weight: 5,
    generate: function(diff) {
      var agencies = [
        { name: 'TNB',   domain: 'mytnb.com.my',         service: 'electricity bill',          action: 'Pay before the 15th via' },
        { name: 'LHDN',  domain: 'mytax.hasil.gov.my',    service: 'income tax assessment',     action: 'View your notice at'      },
        { name: 'JPJ',   domain: 'portal.jpj.gov.my',     service: 'driving licence renewal',   action: 'Renew online at'          },
        { name: 'KWSP',  domain: 'i-akaun.kwsp.gov.my',   service: 'EPF contribution statement', action: 'View your statement at'  }
      ];
      var agency = pickRandom(agencies);
      var amount = Math.floor(Math.random() * 200) + 50;
      var loss   = { easy: 200, normal: 400, hard: 800 }[diff];
      return {
        label:       '📧 Email from Government',
        text:        agency.name + ' Notice: Your ' + agency.service + ' for this month amounts to RM' + amount + '.00. ' + agency.action + ' ' + agency.domain + ' or visit any authorised payment counter near you.',
        hint:        agency.domain,
        explanation: 'THIS IS LEGITIMATE. "' + agency.domain + '" is the official government portal for ' + agency.name + '. The domain is a verified Malaysian government or official domain. There is no request for passwords, banking credentials, or urgent transfers to unknown accounts.',
        loss:        loss,
        falseLoss:   loss
      };
    }
  },

  // --- REAL: App Receipt ---
  {
    id: 'real_app_receipt',
    answer: 'real',
    category: 'Legitimate Message',
    badgeClass: 'badge-legit',
    weight: 5,
    generate: function(diff) {
      var apps = [
        {
          name:   'Grab',
          domain: 'grab.com',
          makeText: function() {
            var routes = [['KLCC','Bangsar'],['Pavilion','Chow Kit'],['Mid Valley','Ampang'],['Sunway','Petaling Jaya']];
            var route  = pickRandom(routes);
            var amt    = (Math.floor(Math.random() * 30) + 8) + '.50';
            return 'Grab Receipt: Your ride from ' + route[0] + ' to ' + route[1] + ' cost RM' + amt + '. GrabPay used. View full receipt at grab.com/receipts';
          }
        },
        {
          name:   'Shopee',
          domain: 'shopee.com.my',
          makeText: function() {
            var items = ['USB Cable', 'Phone Case', 'Earphones', 'Laptop Stand', 'Mechanical Keyboard'];
            var item  = pickRandom(items);
            var amt   = (Math.floor(Math.random() * 80) + 15) + '.00';
            var order = 'SG' + Math.floor(Math.random() * 90000 + 10000);
            return 'Shopee Order #' + order + ' confirmed. Item: ' + item + ' (RM' + amt + '). Delivery in 3-5 working days. Track your order at shopee.com.my/orders';
          }
        },
        {
          name:   'foodpanda',
          domain: 'foodpanda.com.my',
          makeText: function() {
            var restaurants = ['McDonald\'s', 'Pizza Hut', 'KFC', 'Burger King', 'Subway'];
            var r   = pickRandom(restaurants);
            var amt = (Math.floor(Math.random() * 50) + 20) + '.00';
            return 'foodpanda: Your order from ' + r + ' is confirmed. Total: RM' + amt + '. Estimated delivery 30-45 minutes. Track at foodpanda.com.my/orders';
          }
        }
      ];
      var app  = pickRandom(apps);
      var text = app.makeText();
      var loss = { easy: 200, normal: 400, hard: 800 }[diff];
      return {
        label:       '📧 App Notification',
        text:        text,
        hint:        app.domain,
        explanation: 'THIS IS LEGITIMATE. This is a standard receipt from ' + app.name + '. The domain "' + app.domain + '" is official. There are no third-party links, no payment requests, and no urgency tactics. Receipts like this are sent automatically after every transaction.',
        loss:        loss,
        falseLoss:   loss
      };
    }
  },

  // --- REAL: Institutional Notice ---
  {
    id: 'real_institution',
    answer: 'real',
    category: 'Legitimate Message',
    badgeClass: 'badge-legit',
    weight: 4,
    generate: function(diff) {
      var institutions = [
        { name: 'Universiti Malaya', domain: 'student.um.edu.my',  notice: 'Semester 2 2026/2027 subject registration opens 1 July.' },
        { name: 'UiTM',              domain: 'student.uitm.edu.my', notice: 'Your examination results for May 2026 are now available.' },
        { name: 'UKM',               domain: 'myinfo.ukm.my',       notice: 'Your scholarship application status has been updated.'   },
        { name: 'PTPTN',             domain: 'idpay.ptptn.gov.my',  notice: 'Your PTPTN monthly repayment for June 2026 is now due.'  }
      ];
      var inst = pickRandom(institutions);
      var loss = { easy: 200, normal: 400, hard: 800 }[diff];
      return {
        label:       '📧 Email from Institution',
        text:        inst.name + ': ' + inst.notice + ' Log in at ' + inst.domain + ' for full details.',
        hint:        inst.domain,
        explanation: 'THIS IS LEGITIMATE. "' + inst.domain + '" is the official portal of ' + inst.name + '. The domain uses .edu.my or .gov.my, which are regulated Malaysian extensions. There are no suspicious links, no money requests, and no urgency pressure.',
        loss:        loss,
        falseLoss:   loss
      };
    }
  }

];


// ============================================================
// 4. GAME STATE
// ============================================================

var selectedDifficulty  = 'normal';
var selectedMode        = 'classic';

var savings             = 10000;
var streak              = 0;
var bestStreak          = 0;
var hintsLeft           = 3;
var hintUsedThis        = false;
var answered            = false;
var timerInterval       = null;
var timeLeft            = 15;
var totalTime           = 15;
var correctCount        = 0;
var wrongCount          = 0;
var caseCount           = 0;
var missedCategories    = {};

var highScoreClassic    = null;
var highScoreSurvival   = null;

var recentTypes         = [];
var currentScenario     = null;
var lastVictim          = null;
var classicScenarios    = [];


// ============================================================
// 5. MENU SELECTION
// ============================================================

function selectDifficulty(diff) {
  selectedDifficulty = diff;
  document.querySelectorAll('.difficulty-card').forEach(function(c) {
    c.classList.remove('selected');
  });
  document.getElementById('card-' + diff).classList.add('selected');
}

function selectMode(mode) {
  selectedMode = mode;
  document.querySelectorAll('.mode-card').forEach(function(c) {
    c.classList.remove('selected');
  });
  document.getElementById('mode-' + mode).classList.add('selected');
}


// ============================================================
// 6. TEMPLATE ENGINE
// ============================================================

function pickTemplate() {
  var available = templates.filter(function(t) {
    return recentTypes.indexOf(t.id) === -1;
  });
  if (available.length === 0) available = templates;

  var total = available.reduce(function(sum, t) { return sum + t.weight; }, 0);
  var rand  = Math.random() * total;
  var cum   = 0;

  for (var i = 0; i < available.length; i++) {
    cum += available[i].weight;
    if (rand < cum) return available[i];
  }
  return available[available.length - 1];
}

function generateScenario() {
  var template = pickTemplate();
  var data     = template.generate(selectedDifficulty);

  recentTypes.push(template.id);
  if (recentTypes.length > 2) recentTypes.shift();

  var victim;
  do {
    victim = pickRandom(victims);
  } while (victim === lastVictim);
  lastVictim = victim;

  return {
    answer:      template.answer,
    category:    data.category || template.category,
    badgeClass:  template.badgeClass,
    label:       data.label,
    text:        data.text,
    hint:        data.hint,
    explanation: data.explanation,
    loss:        data.loss,
    falseLoss:   data.falseLoss,
    victim:      victim
  };
}


// ============================================================
// 7. START GAME
// ============================================================

function startGame() {
  var timers = { easy: 20, normal: 15, hard: 8 };
  totalTime = timers[selectedDifficulty];

  savings          = 10000;
  streak           = 0;
  bestStreak       = 0;
  hintsLeft        = 3;
  correctCount     = 0;
  wrongCount       = 0;
  caseCount        = 0;
  missedCategories = {};
  recentTypes      = [];
  lastVictim       = null;
  answered         = false;

  clearInterval(timerInterval);

  for (var i = 1; i <= 3; i++) {
    document.getElementById('hint-' + i).classList.remove('used');
  }

  document.getElementById('mode-label-text').textContent = selectedMode === 'survival' ? 'SURVIVAL' : 'CLASSIC';

  if (selectedMode === 'survival') {
    document.getElementById('progress-row').classList.add('hidden');
    document.getElementById('savings-row').classList.remove('hidden');
    document.getElementById('case-total-top').classList.add('hidden');
  } else {
    document.getElementById('progress-row').classList.remove('hidden');
    document.getElementById('savings-row').classList.add('hidden');
    document.getElementById('case-total-top').classList.remove('hidden');
    document.getElementById('case-total-top').textContent = '/ 10';

    classicScenarios = [];
    for (var j = 0; j < 10; j++) {
      classicScenarios.push(generateScenario());
    }
    recentTypes = [];
    lastVictim  = null;
  }

  updateSavingsDisplay();
  updateStreakDisplay();

  showScreen('game-screen');
  loadScenario();
}


// ============================================================
// 8. LOAD SCENARIO
// ============================================================

function loadScenario() {
  if (selectedMode === 'classic') {
    currentScenario = classicScenarios[caseCount];
  } else {
    currentScenario = generateScenario();
  }

  var s = currentScenario;

  document.getElementById('scenario-text').textContent      = s.text;
  document.getElementById('message-type-label').textContent = s.label;
  document.getElementById('victim-avatar').textContent      = s.victim.emoji;
  document.getElementById('victim-name').textContent        = s.victim.name;
  document.getElementById('victim-details').textContent     = s.victim.details;
  document.getElementById('case-number').textContent        = String(caseCount + 1).padStart(2, '0');
  document.getElementById('case-counter-top').textContent   = caseCount + 1;

  if (selectedMode === 'classic') {
    var pct = (caseCount / 10) * 100;
    document.getElementById('progress-text').textContent  = 'Case ' + (caseCount + 1) + ' / 10';
    document.getElementById('progress-fill').style.width = pct + '%';
  }

  if (selectedMode === 'survival') {
    var savPct  = (savings / 10000) * 100;
    var savFill = document.getElementById('savings-fill');
    savFill.style.width = savPct + '%';
    savFill.className   = 'progress-fill savings-track-fill' +
                          (savings <= 3000 ? ' danger' : savings <= 6000 ? ' warning' : '');
  }

  var fb = document.getElementById('feedback-box');
  fb.className = 'feedback-box hidden';

  document.getElementById('tipu-btn').disabled  = false;
  document.getElementById('betul-btn').disabled = false;

  hintUsedThis = false;
  var semak    = document.getElementById('semak-btn');
  semak.className = 'semak-btn' + (hintsLeft <= 0 ? ' disabled' : '');

  answered = false;
  timeLeft  = totalTime;

  startTimer();
}


// ============================================================
// 9. TIMER
// ============================================================

function startTimer() {
  clearInterval(timerInterval);

  var bar  = document.getElementById('timer-bar');
  var text = document.getElementById('timer-text');

  bar.style.width   = '100%';
  bar.className     = 'timer-bar';
  text.textContent  = timeLeft;

  timerInterval = setInterval(function() {
    timeLeft--;
    text.textContent  = timeLeft;

    var pct           = (timeLeft / totalTime) * 100;
    bar.style.width   = pct + '%';

    if      (pct <= 25) bar.className = 'timer-bar danger';
    else if (pct <= 50) bar.className = 'timer-bar warning';

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      bar.style.width = '0%';
      setTimeout(function() { checkAnswer('timeout'); }, 200);
    }
  }, 1000);
}


// ============================================================
// 10. CHECK ANSWER
// ============================================================

function checkAnswer(playerAnswer) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  var s         = currentScenario;
  var isTimeout = (playerAnswer === 'timeout');
  var isCorrect = !isTimeout && (playerAnswer === s.answer);

  document.getElementById('tipu-btn').disabled  = true;
  document.getElementById('betul-btn').disabled = true;
  document.getElementById('semak-btn').classList.add('disabled');

  if (isCorrect) {
    correctCount++;
    streak++;
    if (streak > bestStreak) bestStreak = streak;

    var mult  = getMultiplier();
    var bonus = 0;
    if      (mult >= 3)   bonus = 300;
    else if (mult >= 2)   bonus = 200;
    else if (mult >= 1.5) bonus = 100;

    savings = Math.min(10000, savings + bonus);

    var moneyText = bonus > 0 ? '+ ' + formatRM(bonus) + ' streak bonus!' : 'Savings protected.';
    showFeedback(true, s, moneyText, 'gain', false);

  } else {
    wrongCount++;
    streak = 0;

    var lossAmt;
    if (isTimeout) {
      lossAmt = s.loss;
    } else {
      lossAmt = (s.answer === 'real') ? s.falseLoss : s.loss;
    }

    savings -= lossAmt;
    if (savings < 0) savings = 0;

    if (!missedCategories[s.category]) missedCategories[s.category] = 0;
    missedCategories[s.category]++;

    var prefix    = isTimeout ? '⏰ Time\'s up! ' : '';
    showFeedback(false, s, prefix + '- ' + formatRM(lossAmt) + ' from your savings', 'loss', isTimeout);
  }

  updateSavingsDisplay();
  updateStreakDisplay();
}


// ============================================================
// 11. FEEDBACK
// ============================================================

function showFeedback(isCorrect, s, moneyText, moneyClass, isTimeout) {
  var fb      = document.getElementById('feedback-box');
  var verdict = document.getElementById('feedback-verdict');
  var badge   = document.getElementById('scam-category-badge');
  var expEl   = document.getElementById('feedback-explanation');
  var moneyEl = document.getElementById('money-change');

  fb.className = 'feedback-box ' + (isCorrect ? 'correct' : 'wrong');

  if (isTimeout) {
    verdict.textContent = '⏰ Too slow! ' + s.victim.name + ' got scammed!';
  } else if (isCorrect) {
    verdict.textContent = '✅ Correct! You protected ' + s.victim.name + '!';
  } else {
    verdict.textContent = (s.answer === 'real')
      ? '❌ Wrong! That was a legitimate message.'
      : '❌ Wrong! ' + s.victim.name + ' got scammed!';
  }

  badge.textContent = s.category;
  badge.className   = 'scam-category-badge ' + s.badgeClass;
  expEl.textContent = s.explanation;
  moneyEl.textContent = moneyText;
  moneyEl.className   = 'money-change ' + moneyClass;

  if (!isCorrect) {
    var caseFile = document.getElementById('case-file');
    caseFile.classList.add('shake');
    setTimeout(function() { caseFile.classList.remove('shake'); }, 500);
  }
}


// ============================================================
// 12. HINT
// ============================================================

function useHint() {
  if (hintsLeft <= 0 || hintUsedThis || answered) return;

  var s      = currentScenario;
  var textEl = document.getElementById('scenario-text');
  var phrase = s.hint;

  var escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var regex   = new RegExp(escaped, 'g');

  textEl.innerHTML = s.text.replace(regex,
    '<span class="highlight">' + phrase + '</span>'
  );

  document.getElementById('hint-' + hintsLeft).classList.add('used');
  hintsLeft--;
  hintUsedThis = true;

  if (hintsLeft <= 0) {
    document.getElementById('semak-btn').classList.add('disabled');
  }
}


// ============================================================
// 13. MULTIPLIER
// ============================================================

function getMultiplier() {
  if (streak >= 4) return 3;
  if (streak >= 3) return 2;
  if (streak >= 2) return 1.5;
  return 1;
}


// ============================================================
// 14. DISPLAY UPDATES
// ============================================================

function updateSavingsDisplay() {
  var el = document.getElementById('savings-amount');
  el.textContent = formatRM(savings);
  el.className   = 'savings-amount';
  if      (savings <= 3000) el.classList.add('danger');
  else if (savings <= 6000) el.classList.add('warning');
  el.classList.add('pulse');
  setTimeout(function() { el.classList.remove('pulse'); }, 350);
}

function updateStreakDisplay() {
  document.getElementById('streak-count').textContent = streak;
  var badge = document.getElementById('multiplier-display');
  var mult  = getMultiplier();
  badge.textContent = 'x' + mult;
  badge.className   = 'multiplier-badge';
  if      (mult >= 3) badge.classList.add('active-x3');
  else if (mult >= 2) badge.classList.add('active-x2');
}


// ============================================================
// 15. NEXT QUESTION
// ============================================================

function nextQuestion() {
  caseCount++;

  if (savings <= 0) {
    showGameOver();
    return;
  }

  if (selectedMode === 'classic' && caseCount >= 10) {
    showResults();
    return;
  }

  loadScenario();
}


// ============================================================
// 16. RESULTS (Classic only)
// ============================================================

function showResults() {
  clearInterval(timerInterval);

  if (highScoreClassic === null || savings > highScoreClassic) {
    highScoreClassic = savings;
    document.getElementById('high-score-display').textContent = formatRM(highScoreClassic);
  }

  var finalEl = document.getElementById('final-savings');
  finalEl.textContent = formatRM(savings);
  finalEl.style.color = savings >= 8000 ? 'var(--green)' : savings >= 5000 ? 'var(--orange)' : 'var(--red)';

  var pct    = savings / 10000;
  var rating = '';
  if      (pct === 1)  rating = '🏆 Perfect! Full savings intact. You are a Scam Detector expert!';
  else if (pct >= 0.8) rating = '💪 Excellent! Almost nothing slipped past you.';
  else if (pct >= 0.6) rating = '👍 Good. But some scams nearly got through.';
  else if (pct >= 0.4) rating = '😬 Be more careful. Scammers almost cleaned you out.';
  else                 rating = '😰 Dangerous. You need to be far more alert online.';

  document.getElementById('results-rating').textContent      = rating;
  document.getElementById('correct-count').textContent       = correctCount;
  document.getElementById('wrong-count').textContent         = wrongCount;
  document.getElementById('best-streak-display').textContent = bestStreak;

  var catList = document.getElementById('category-list');
  var catKeys = Object.keys(missedCategories);

  if (catKeys.length === 0) {
    catList.innerHTML = '<p style="color:var(--green);font-size:0.88rem;">None. You identified everything correctly.</p>';
  } else {
    catList.innerHTML = '';
    catKeys.forEach(function(cat) {
      var item       = document.createElement('div');
      item.className = 'category-item';
      item.innerHTML = '<span>' + cat + '</span><span style="color:var(--red);">' + missedCategories[cat] + ' missed</span>';
      catList.appendChild(item);
    });
  }

  showScreen('results-screen');
}


// ============================================================
// 17. GAME OVER
// ============================================================

function showGameOver() {
  clearInterval(timerInterval);

  var survBox = document.getElementById('survival-cases-box');

  if (selectedMode === 'survival') {
    survBox.classList.remove('hidden');
    document.getElementById('survival-case-count').textContent = caseCount;

    if (highScoreSurvival === null || caseCount > highScoreSurvival) {
      highScoreSurvival = caseCount;
      document.getElementById('survival-score-display').textContent = highScoreSurvival;
    }
  } else {
    survBox.classList.add('hidden');
  }

  var missedEl = document.getElementById('gameover-missed');
  var catKeys  = Object.keys(missedCategories);

  if (catKeys.length === 0) {
    missedEl.innerHTML = '<p style="color:var(--dim);">No missed category data.</p>';
  } else {
    var html = '<p style="font-size:0.72rem;color:var(--dim);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Scam Types That Fooled You</p>';
    catKeys.forEach(function(cat) {
      html += '<p style="margin-bottom:6px;">• ' + cat + ': <span style="color:var(--red);">' + missedCategories[cat] + ' time(s)</span></p>';
    });
    missedEl.innerHTML = html;
  }

  showScreen('gameover-screen');
}


// ============================================================
// 18. RESET
// ============================================================

function resetGame() {
  clearInterval(timerInterval);
  startGame();
}


