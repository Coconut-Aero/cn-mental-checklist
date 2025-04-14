<script>

export function evaluate(answers) {
    const results = []
    const P_Score = calculateP(answers)
    const E_Score = calculateE(answers)
    const N_Score = calculateN(answers)
    const L_Score = calculateL(answers)
    const P_Full_Mark = 23
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

    const sexAnswer = answers[88] // 注意第89题是index 88
    const ageAnswer = answers[89] // 第90题是index 89

    const normData = getNormData(sexAnswer, ageAnswer)

    if (normData) {
    // 有常模 → 计算T分
    const P_T = 50 + 10 * (P_Score - normData.P[0]) / normData.P[1]
    const E_T = 50 + 10 * (E_Score - normData.E[0]) / normData.E[1]
    const N_T = 50 + 10 * (N_Score - normData.N[0]) / normData.N[1]
    const L_T = 50 + 10 * (L_Score - normData.L[0]) / normData.L[1]
    const P_T_Status = getTypeByTScore(P_T)
    const E_T_Status = getTypeByTScore(E_T)
    const N_T_Status = getTypeByTScore(N_T)
    const L_T_Status = interpretL(L_T)
    
    results.push({
        title: '精神质 P T分',
        result: P_T.toFixed(2),
        full_mark: 100,
        status: P_T_Status,
    })

    results.push({
        title: '外向性 E T分',
        result: E_T.toFixed(2),
        full_mark: 100,
        status: E_T_Status,
    })

    results.push({
        title: '神经质 N T分',
        result: N_T.toFixed(2),
        full_mark: 100,
        status: N_T_Status,
    })

    results.push({
        title: '说谎 L T分',
        result: L_T.toFixed(2),
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


// 常模数据表（88题版）
const normTable = {
  male: {
    0: { P: [6.65, 4.36], E: [11.55, 3.99], N: [12.31, 4.00], L: [11.76, 4.18] }, // 16~19
    1: { P: [5.96, 2.84], E: [10.63, 4.44], N: [11.26, 4.26], L: [12.17, 3.57] }, // 20~29
    2: { P: [5.85, 3.32], E: [9.92, 3.90], N: [12.02, 4.56], L: [12.39, 3.93] },  // 30~39
    3: { P: [5.67, 2.54], E: [9.65, 4.77], N: [10.12, 5.04], L: [13.55, 3.56] },  // 40~49
    4: { P: [6.05, 3.80], E: [8.63, 3.69], N: [11.07, 4.08], L: [13.93, 3.80] },  // 50~59
    5: { P: [4.40, 2.33], E: [9.80, 4.64], N: [8.92, 4.59],  L: [11.55, 2.73] },  // 60+
  },
  female: {
    0: { P: [5.06, 2.96], E: [10.38, 4.12], N: [12.84, 4.92], L: [11.70, 4.85] },
    1: { P: [4.92, 2.95], E: [9.65, 4.49],  N: [11.36, 4.42], L: [13.35, 3.63] },
    2: { P: [4.80, 3.33], E: [8.97, 4.45],  N: [12.02, 5.05], L: [14.17, 3.85] },
    3: { P: [4.03, 2.40], E: [8.37, 4.35],  N: [12.15, 5.73], L: [15.41, 3.22] },
    4: { P: [4.05, 2.90], E: [9.22, 4.21],  N: [11.09, 5.23], L: [14.09, 4.03] },
    5: { P: [3.82, 2.41], E: [9.34, 4.36],  N: [11.22, 5.08], L: [13.29, 3.65] },
  }
};

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

// 获取常模数据
function getNormData(sexIndex, ageIndex) {
  let sexKey = '';
  if (sexIndex === 0) sexKey = 'male';
  if (sexIndex === 1) sexKey = 'female';

  // 只处理男/女数据，其他不返回
  if (!sexKey) return null;

  const ageData = normTable[sexKey][ageIndex];
  if (!ageData) return null;

  return ageData;
}


function calculateP(answers) {
  const items = [-2, -6, -9, -12, -18, 22, 26, 30, 34, -38, -42, 46, 50, -56, -62, 66, 68, -72, 75, 76, 81, 85, -88];
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
  const items = [1, 5, 10, 13, 14, 17, -21, 25, -29, 33, 37, 41, -45, 49, 53, 55, 61, 65, 71, 80, 84];
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
  const items = [3, 7, 12, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 57, 59, 63, 67, 69, 73, 74, 77, 78, 82, 86];
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
  const items = [-4, -8, -16, 20, -24, -28, 32, 36, -40, -44, -48, -52, -54, 58, -60, -64, -70, -79, -83, 87];
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