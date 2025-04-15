<script>

export function evaluate(answers) {
    const results = []
    const P_Score = calculateP(answers)
    const E_Score = calculateE(answers)
    const N_Score = calculateN(answers)
    const L_Score = calculateL(answers)
    const P_Full_Mark = 20
    const E_Full_Mark = 21
    const N_Full_Mark = 24
    const L_Full_Mark = 20

    results.push({
        title: '精神质 P 原始分',
        result: P_Score,
        full_mark: P_Full_Mark,
    })

    results.push({
        title: '外向性 E 原始分',
        result: E_Score,
        full_mark: E_Full_Mark,
    })

    results.push({
        title: '神经质 N 原始分',
        result: N_Score,
        full_mark: N_Full_Mark,
    })

    results.push({
        title: '说谎 L 原始分',
        result: L_Score,
        full_mark: L_Full_Mark,
    })

    const sexAnswer = answers[85] 

    if ( sexAnswer === 1 || sexAnswer === 0 ) { 
        let sex = "male"
        if (sexAnswer == 1) {
            sex = "female"
        }
        // 有常模 → 计算T分
        const P_T = getStandardScore(P_Score, 'P', sex)
        const E_T = getStandardScore(E_Score, 'E', sex)
        const N_T = getStandardScore(N_Score, 'N', sex)
        const L_T = getStandardScore(L_Score, 'L', sex)
        const P_T_Status = getTypeByTScore(P_T)
        const E_T_Status = getTypeByTScore(E_T)
        const N_T_Status = getTypeByTScore(N_T)
        const L_T_Status = interpretL(L_T)
        
        results.push({
            title: '精神质 P T分',
            result: P_T,
            full_mark: 100,
            status: P_T_Status,
        })

        results.push({
            title: '外向性 E T分',
            result: E_T,
            full_mark: 100,
            status: E_T_Status,
        })

        results.push({
            title: '神经质 N T分',
            result: N_T,
            full_mark: 100,
            status: N_T_Status,
        })

        results.push({
            title: '说谎 L T分',
            result: L_T,
            full_mark: 100,
            status: L_T_Status,
        })

        results.push({
            title: '气质类型',
            caption: getTemperamentType(N_T, E_T),
        })
    }

    return results
}

function interpretL(T_L) {
  if (T_L < 50) {
    return '答题态度诚实，结果可信';
  } else if (T_L >= 50 && T_L < 60) {
    return '答题态度基本正常，结果可参考';
  } else {
    return '存在掩饰倾向，问卷结果可能失真';
  }
}

function getTemperamentType(N_T, E_T) {
  // 判断 E 分型
  let E_Type = '';
  if (E_T < 43.3) {
    E_Type = '内向型';
  } else if (E_T <= 56.7) {
    E_Type = '中间型';
  } else {
    E_Type = '外向型';
  }

  // 判断 N 分型
  let N_Type = '';
  if (N_T < 43.3) {
    N_Type = '稳定型';
  } else if (N_T <= 56.7) {
    N_Type = '中间型';
  } else {
    N_Type = '不稳定型';
  }

  // 根据气质类型表确定最终类型
  const typeMap = {
    '稳定型': {
      '内向型': '粘液质',
      '中间型': '多血-粘液质',
      '外向型': '多血质',
    },
    '中间型': {
      '内向型': '粘液-抑郁质',
      '中间型': '多种气质混合型',
      '外向型': '多血-胆汁质',
    },
    '不稳定型': {
      '内向型': '抑郁质',
      '中间型': '胆汁-抑郁质',
      '外向型': '胆汁质',
    }
  };

  return typeMap[N_Type][E_Type];
}



function getTypeByTScore(tScore) {
  if (tScore >= 43.3 && tScore <= 56.7) {
    return '中间型'
  } else if (
    (tScore >= 38.5 && tScore < 43.3) ||
    (tScore > 56.7 && tScore <= 61.5)
  ) {
    return '倾向型'
  } else {
    return '典型型'
  }
}

const normTable = [
    { raw: 24, N: { male: 80, female: 78 }},
    { raw: 23, N: { male: 78, female: 76 }},
    { raw: 22, N: { male: 76, female: 74 }},
    { raw: 21, E: { male: 75, female: 79 }, N: { male: 74, female: 72 },},
    { raw: 20, P: { male: 93, female: 100 }, E: { male: 73, female: 77 }, N: { male: 72, female: 69 }, L: { male: 62, female: 73 } },
    { raw: 19, P: { male: 90, female: 96 }, E: { male: 71, female: 74 }, N: { male: 69, female: 67 }, L: { male: 60, female: 70 } },
    { raw: 18, P: { male: 87, female: 93 }, E: { male: 68, female: 72 }, N: { male: 67, female: 65 }, L: { male: 58, female: 67 } },
    { raw: 17, P: { male: 84, female: 90 }, E: { male: 66, female: 69 }, N: { male: 65, female: 63 }, L: { male: 56, female: 64 } },
    { raw: 16, P: { male: 81, female: 86 }, E: { male: 64, female: 67 }, N: { male: 63, female: 61 }, L: { male: 55, female: 62 } },
    { raw: 15, P: { male: 78, female: 83 }, E: { male: 62, female: 65 }, N: { male: 61, female: 59 }, L: { male: 53, female: 59 } },
    { raw: 14, P: { male: 75, female: 79 }, E: { male: 59, female: 62 }, N: { male: 59, female: 57 }, L: { male: 51, female: 56 } },
    { raw: 13, P: { male: 72, female: 76 }, E: { male: 57, female: 60 }, N: { male: 56, female: 54 }, L: { male: 50, female: 53 } },
    { raw: 12, P: { male: 68, female: 73 }, E: { male: 55, female: 57 }, N: { male: 54, female: 52 }, L: { male: 48, female: 50 } },
    { raw: 11, P: { male: 65, female: 69 }, E: { male: 52, female: 55 }, N: { male: 52, female: 50 }, L: { male: 46, female: 47 } },
    { raw: 10, P: { male: 62, female: 66 }, E: { male: 50, female: 52 }, N: { male: 50, female: 48 }, L: { male: 44, female: 44 } },
    { raw:  9, P: { male: 59, female: 62 }, E: { male: 48, female: 50 }, N: { male: 48, female: 46 }, L: { male: 43, female: 42 } },
    { raw:  8, P: { male: 56, female: 59 }, E: { male: 46, female: 48 }, N: { male: 46, female: 44 }, L: { male: 41, female: 39 } },
    { raw:  7, P: { male: 51, female: 56 }, E: { male: 43, female: 45 }, N: { male: 43, female: 41 }, L: { male: 39, female: 36 } },
    { raw:  6, P: { male: 50, female: 52 }, E: { male: 41, female: 43 }, N: { male: 41, female: 39 }, L: { male: 37, female: 33 } },
    { raw:  5, P: { male: 47, female: 49 }, E: { male: 39, female: 41 }, N: { male: 39, female: 37 }, L: { male: 35, female: 30 } },
    { raw:  4, P: { male: 44, female: 46 }, E: { male: 37, female: 38 }, N: { male: 37, female: 35 }, L: { male: 34, female: 27 } },
    { raw:  3, P: { male: 41, female: 42 }, E: { male: 34, female: 35 }, N: { male: 34, female: 32 }, L: { male: 32, female: 24 } },
    { raw:  2, P: { male: 37, female: 39 }, E: { male: 32, female: 33 }, N: { male: 31, female: 30 }, L: { male: 30, female: 22 } },
    { raw:  1, P: { male: 35, female: 35 }, E: { male: 30, female: 31 }, N: { male: 29, female: 29 }, L: { male: 29, female: 19 } },
    { raw:  0, P: { male: 31, female: 32 }, E: { male: 27, female: 28 }, N: { male: 26, female: 27 }, L: { male: 27, female: 16 } }
]


function getStandardScore(rawScore, dimension, gender) {
  // 找到对应原始分的那一行
  const row = normTable.find(item => item.raw === rawScore)
  if (!row) {
    return null // 超出范围就返回 null 喵
  }

  // gender 应该是 'male' 或 'female'
  return row[dimension][gender]
}

function calculateP(answers) {
  const items = [-2,-8,-10,-17,-33,-50,-62,-80,19,23,27,38,41,44,57,58,65,69,73,77];
  let score = 0;

  items.forEach(item => {
    const idx = Math.abs(item) - 1;
    const answer = answers[idx];
    if (item < 0) {
      if (answer === 1) score++;
    } else {
      if (answer === 0) score++;
    }
  });

  return score;
}

function calculateE(answers) {
  const items = [1,5,9,13,16,22,29,32,35,40,43,46,49,53,56,61,72,76,85,-26,-37];
  let score = 0;

  items.forEach(item => {
    const idx = Math.abs(item) - 1;
    const answer = answers[idx];
    if (item < 0) {
      if (answer === 1) score++;
    } else {
      if (answer === 0) score++;
    }
  });

  return score;
}

function calculateN(answers) {
  const items = [3,6,11,14,18,20,24,28,30,34,36,42,47,51,54,59,63,66,67,70,74,78,82,84];
  let score = 0;

  items.forEach(item => {
    const idx = Math.abs(item) - 1;
    const answer = answers[idx];
    if (item < 0) {
      if (answer === 1) score++;
    } else {
      if (answer === 0) score++;
    }
  });

  return score;
}

function calculateL(answers) {
  const items = [12,31,48,68,79,81,-4,-7,-15,-21,-25,-39,-45,-52,-55,-60,-64,-71,-75,-83];
  let score = 0;

  items.forEach(item => {
    const idx = Math.abs(item) - 1;
    const answer = answers[idx];
    if (item < 0) {
      if (answer === 1) score++;
    } else {
      if (answer === 0) score++;
    }
  });

  return score;
}

</script>