import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const getAIResponse = async (userQuery, context) => {
  const prompt = `
You are an AI study assistant for a college student.

Student Name: ${context.studentName}
Branch: ${context.branch}
Subjects: ${context.subjects.join(", ")}

Study Goals:
${context.goals.map(g =>
  `- ${g.subject}: ${g.hoursPerWeek} hrs/week (${g.priority})`
).join("\n")}

Today's Plan:
${context.todayPlan.length
  ? context.todayPlan.map(p => `- ${p.subjectId}: ${p.hours} hrs`).join("\n")
  : "No plan for today"}

User Question:
"${userQuery}"

Respond briefly, clearly, and in a motivating tone.
Do NOT explain theory unless asked.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
};
