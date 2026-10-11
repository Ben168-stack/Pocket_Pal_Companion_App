/* Simplified Chinese translations.
   Left side: the exact English text used in the code. Right side: what to show in Chinese.
   Keep {placeholders} like {n} or {task} in the Chinese text. They get filled in with numbers or names. */
const ZH={
  /* ---------- days ---------- */
  "Monday":"星期一","Tuesday":"星期二","Wednesday":"星期三","Thursday":"星期四","Friday":"星期五","Saturday":"星期六","Sunday":"星期日",

  /* ---------- plans ---------- */
  "Steady":"稳步模式",
  "Standard costs and recovery. For normal weeks.":"标准消耗与恢复，适合普通的一周。",
  "Crunch week":"冲刺周",
  "Two extra tokens, but one Reset a day is required. Ends after 7 days.":"每天多 2 个能量币，但每天必须做一次恢复。7 天后结束。",
  "Free & easy":"轻松模式",
  "Every Reset gives 1 extra token. For recess and light weeks.":"每次恢复额外多得 1 个能量币，适合假期和轻松的一周。",
  "Custom":"自定义",
  "Choose your own daily tokens between 8 and 14.":"自行设定每天 8 到 14 个能量币。",

  /* ---------- task types ---------- */
  "Unfamiliar admin":"不熟悉的行政事务","Bank, visa or hall office":"银行、签证或宿舍办公室",
  "Academic deadline":"学业截止日期","Assignment or quiz":"作业或小测验",
  "First lab report":"第一份实验报告","A new kind of assignment":"一种新类型的作业",
  "Healthcare visit":"看医生","Seeing a doctor on campus":"去校园诊所看病",
  "Difficult conversation":"艰难的对话","Group conflict, awkward talk":"小组冲突、尴尬的谈话",
  "Routine errand":"日常杂事","Laundry, groceries":"洗衣服、买日用品",
  "Custom task":"自定义任务",

  /* ---------- reset activities ---------- */
  "Walk, swim or gym":"散步、游泳或健身","20 minutes counts":"20 分钟就算数",
  "Meal or chat with a friend":"和朋友吃饭或聊天","In person or a call home":"见面或给家里打电话",
  "Something you enjoy":"做喜欢的事","15 minutes, no studying":"15 分钟，不学习",
  "Proper break":"好好休息","Half a day with nothing logged":"半天什么都不记录",

  /* ---------- default people ---------- */
  "Hall friend":"宿舍朋友","Lives two floors down":"住在楼下两层",
  "Course mate":"同班同学","Same EEE lab group":"同一个 EEE 实验小组",
  "Senior":"学长学姐","Year 2, been through it":"大二，过来人",
  "Student support":"学生支持服务","NTU counselling and wellbeing":"NTU 心理咨询与健康服务",
  "Added by you":"由你添加",

  /* ---------- Mochi ---------- */
  "Plenty in the tank today.":"今天能量满满。",
  "We're doing fine. Pace it.":"状态还不错，注意节奏。",
  "I'm getting tired. Share or Reset before the next big task?":"我有点累了。做下一件大事前，要不要先找人帮忙或恢复一下？",
  "I've run out. That's your cue to rest too.":"我没电了。这也是在提醒你该休息了。",
  "Mochi looks energetic":"Mochi 精力充沛","Mochi looks okay":"Mochi 状态还行","Mochi looks tired":"Mochi 有点累","Mochi looks asleep":"Mochi 睡着了",

  /* ---------- tab bar, status bar ---------- */
  "Today":"今天","Week":"本周","Plan":"计划","People":"联系人",
  "Close":"关闭","Switch language":"切换语言",

  /* ---------- Today screen ---------- */
  "Week {n}, {plan}":"第 {n} 周 · {plan}",
  "of {n} tokens left today":"今日剩余（共 {n} 个能量币）",
  "Log a task":"记录任务","Reset":"恢复",
  "How did you sleep?":"昨晚睡得怎么样？",
  "This sets how many tokens you start with today.":"这决定你今天开始时有多少能量币。",
  "Under 6h":"少于 6 小时","−2 tokens":"−2 个能量币",
  "6 to 7h":"6 到 7 小时","no change":"不变",
  "7h or more":"7 小时以上","+2 tokens":"+2 个能量币",
  "Out of tokens":"能量币用完了",
  "One tough day doesn't undo the week. So far you've shared {shares} and had {nights} of sleep. Tomorrow starts fresh.":"辛苦的一天不会抹掉整周的努力。到目前为止，你已找人帮忙 {shares}，并有 {nights}睡得很好。明天重新开始。",
  "{n} task":"{n} 次","{n} tasks":"{n} 次",
  "{n} good night":"{n} 个晚上","{n} good nights":"{n} 个晚上",
  "Running low":"能量不多了",
  "A 20-minute walk before the next task would give a token back.":"做下一件事之前散步 20 分钟，就能拿回 1 个能量币。",
  "Crunch week rule":"冲刺周规则",
  "Log one Reset today to keep the two extra tokens fair.":"今天记录一次恢复，多出的 2 个能量币才算公平。",
  "Deferred":"已推迟","Do now":"现在做",
  "Did it":"已完成","Shared":"已求助","Sleep":"睡眠",
  "Nothing logged yet. Add the first thing on your plate.":"还没有记录。添加你今天要做的第一件事吧。",
  "Slept 7h or more":"睡了 7 小时以上","Slept under 6h":"睡了不到 6 小时","Slept 6 to 7h":"睡了 6 到 7 小时",
  "{task} with {person}":"{task}（{person} 帮忙）",

  /* ---------- Log a task sheet ---------- */
  "Each task starts at 1 token. Taking long, being new to you, or being stressful each add 1.":"每项任务基础消耗 1 个能量币。耗时长、对你来说陌生、或有压力，各加 1 个。",
  "Familiar now, 1 cheaper":"已熟悉，少消耗 1 个",
  "Something else":"其他事情","Name it and rate it yourself":"自己命名并评估",
  "Task name":"任务名称","e.g. Phone call with landlord":"例如：给房东打电话",
  "Takes over 2 hours":"超过 2 小时","Or spreads over several days":"或分散在好几天完成",
  "New to me":"对我来说是新的","First time, or an unfamiliar system":"第一次做，或不熟悉的流程",
  "Stressful":"有压力","Uncertainty, pressure or conflict":"不确定、压力或冲突",
  "You have done this before, so it costs 1 less.":"你以前做过这件事，所以少消耗 1 个。",
  "Do it myself":"自己做","−{n} tokens":"−{n} 个能量币",
  "Share it":"找人帮忙","−1 token":"−1 个能量币",
  "Defer it":"推迟","0 today":"今天不消耗",
  "Pick a different task":"换一个任务",
  "Not enough tokens: this costs {cost} and you have {left}. Share it, defer it, or Reset first.":"能量币不够：这件事需要 {cost} 个，你只剩 {left} 个。可以找人帮忙、推迟，或先恢复一下。",
  "You need 1 token to share. Do a Reset first.":"找人帮忙需要 1 个能量币，先恢复一下吧。",

  /* ---------- Share it sheet ---------- */
  "this task":"这件事",
  "Asking for help costs 1 token instead of {n}. Pick someone, then send the message.":"找人帮忙只需 1 个能量币，而不是 {n} 个。选一个人，然后发送消息。",
  "Hey, I'm stuck on {task}. Could you help me with it, or tell me how you handled it? Even 10 minutes would help a lot.":"嗨，我在「{task}」上卡住了。你能帮帮我，或者告诉我你当时是怎么处理的吗？哪怕 10 分钟也会很有帮助。",
  "Copy message and log share":"复制消息并记录求助",

  /* ---------- Reset sheet ---------- */
  "Recovery earns tokens back. You can gain up to {cap} a day, and {left} are left today.":"恢复可以赚回能量币。每天最多获得 {cap} 个，今天还能获得 {left} 个。",
  "Free & easy adds 1 to each.":"轻松模式下每项额外加 1。",

  /* ---------- Week screen ---------- */
  "Week {n}":"第 {n} 周","Sunday review":"周日回顾","So far":"目前为止",
  "Tokens spent each day":"每天消耗的能量币",
  "Spent":"消耗","Recovered":"恢复","Ran out":"用完","Resets":"恢复次数",
  "Mochi will grow this week":"Mochi 本周会长大","Mochi stays the same size":"Mochi 本周没有长大",
  "You stayed in budget or asked for help. Both count.":"你没有超支，或者向别人求助了。两样都算数。",
  "Share one task or stay in budget to help Mochi grow.":"找人帮忙一次，或者不超支，就能让 Mochi 长大。",
  "Plan for next week":"下周计划",
  "Write one if-then plan for a week that might get busy.":"为可能很忙的一周写一个「如果……就……」计划。",
  "If I have two deadlines, I'll share the admin":"如果有两个截止日期，我就找人帮忙处理行政事务",
  "If I sleep under 6 hours, I'll skip optional tasks":"如果睡不到 6 小时，我就跳过非必要的任务",
  "If it's exam week, I'll still do two 20-minute runs":"就算是考试周，我也会跑两次 20 分钟的步",
  "Your if-then plan":"你的「如果……就……」计划","If ..., I will ...":"如果……，我就……",
  "Start next week":"开始下一周","Available on Sunday":"周日才能开始",

  /* ---------- Plan screen ---------- */
  "Your plan":"你的计划",
  "Changes start next week, so you decide when you're calm, not in the middle of a hard day.":"更改从下周开始生效，让你在平静时做决定，而不是在辛苦的一天里。",
  "You've raised your budget a few weeks running":"你已经连续几周提高预算了",
  "Want to look at what's been draining you? The Week tab shows which days went over.":"想看看是什么在消耗你吗？「本周」页面会显示哪几天超支了。",
  "{n} tokens a day":"每天 {n} 个能量币",
  "Starts next week":"下周开始","Current plan":"当前计划",
  "Daily tokens":"每日能量币",
  "Limited to 8 to 14 so the budget still means something.":"限定在 8 到 14 之间，预算才有意义。",
  "Task costs":"任务消耗",
  "Costs stay between 1 and 5 tokens.":"每项任务消耗 1 到 5 个能量币。",

  /* ---------- People screen ---------- */
  "Your people":"你的支持圈",
  "The people you can share tasks with. Set them up now, so asking for help later is one tap.":"可以帮你分担任务的人。现在设置好，以后求助只需轻点一下。",
  "Add someone":"添加联系人","Name, e.g. Lab partner":"名字，例如：实验搭档","New person's name":"新联系人的名字","Add person":"添加",
  "Message templates":"消息模板",
  "Hey, I'm stuck on [task]. Could you help me with it, or tell me how you handled it?":"嗨，我在「某件事」上卡住了。你能帮帮我，或者告诉我你当时是怎么处理的吗？",
  "I've got a lot on this week. Could we move [task] to next week?":"我这周事情很多。可以把「某件事」挪到下周吗？",

  /* ---------- toasts (pop-up messages) ---------- */
  "Moved to Deferred":"已移到推迟列表",
  "Message copied. Shared for 1 token":"消息已复制，求助只花 1 个能量币",
  "+{n}. Mochi feels better":"+{n}，Mochi 感觉好多了",
  "Added":"已添加",
  "It's Sunday. Review the week.":"今天是周日，回顾一下这周吧。",
  "Good morning. It's {day}.":"早上好，今天是{day}。",
  "Heavy day loaded":"已载入忙碌的一天",
  "Sample week loaded":"已载入示例周",
  "New week. Mochi is ready.":"新的一周开始了，Mochi 准备好了。",

  /* ---------- demo panel and gallery (outside the phone) ---------- */
  "Demo controls":"演示控制",
  "These sit outside the phone so you can run the prototype during your presentation.":"这些按钮在手机外面，方便你在展示时操作原型。",
  "Skip to next day":"跳到下一天",
  "Load Jane's sample week":"载入 Jane 的示例周",
  "Make today a heavy day":"让今天变得忙碌",
  "Start over":"重新开始",
  "Show all screens (for Figma)":"显示所有页面（用于 Figma）",
  "Back to prototype":"返回原型",
  "1 Today, morning":"1 今天·早上","2 Today, energetic":"2 今天·精力充沛","3 Today, tired":"3 今天·疲惫","4 Today, out of tokens":"4 今天·能量币用完",
  "5 Log a task":"5 记录任务","6 Rate a task":"6 评估任务","7 Share it":"7 找人帮忙","8 Reset":"8 恢复",
  "9 Week review":"9 本周回顾","10 Plan":"10 计划","11 People":"11 联系人"
};
