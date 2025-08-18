// ---------- Editable data ----------
const CV_DATA = {
  name: "Aruah Brian Odhiambo",
  title: "Full Stack Developer • BBIT Student @ JKUAT",
  location: "Nairobi, Kenya",
  email: "aruahbrian@gmail.com",
  phone: "+254 714 300 672",
  website: "https://brianaruah.netlify.app",
  github: "https://github.com/Brayo002-bot",
  linkedin: "https://www.linkedin.com/in/brian-aruah-3267462b3",
  summary: `Fourth-year BBIT student at JKUAT and aspiring full stack developer.
Passionate about building reliable, user-focused web applications. Experienced as an ICT Intern at Nairobi Adventist Hospital, with strengths in problem solving, clean architecture, and continuous learning.`,
  skills: [
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "React / Next.js", level: 80 },
    { name: "Node.js / Express", level: 75 },
    { name: "Python", level: 70 },
    { name: "MongoDB / PostgreSQL / MySQL", level: 70 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Git / GitHub", level: 85 },
    { name: "Cloud (AWS • GCP)", level: 60 },
  ],
  experience: [
    {
      role: "ICT Intern",
      company: "Nairobi Adventist Hospital",
      period: "June 2025 – Aug 2025",
      bullets: [
        "Supported network maintenance and troubleshooting across departments.",
        "Provided hardware/software technical support to hospital staff.",
        "Deployed and configured IT equipment and user machines.",
        "Applied cybersecurity best practices in a healthcare environment."
      ]
    }
  ],
  projects: [
    {
      name: "JKUAT Clubs Portal (Demo)",
      detail: "Role-based portal for student clubs (React, Node.js, PostgreSQL).",
      link: "https://example.com/jkuat-clubs"
    },
    {
      name: "MedQueue Lite",
      detail: "Lightweight clinic queue manager (Next.js, MongoDB).",
      link: "https://example.com/medqueue"
    }
  ],
  education: [
    {
      program: "BSc. Business Information Technology (BBIT)",
      school: "Jomo Kenyatta University of Agriculture & Technology (JKUAT)",
      period: "2021 – 2026 (Expected)",
      bullets: ["Relevant Coursework: Web Dev, Databases, Networks, IS Project Mgmt"]
    }
  ],
  certifications: {
    completed: [
      "Google IT Support (In Progress)" // keep here if you want
    ],
    target: [
      "AWS Cloud Practitioner (Target 2025/26)"
    ]
  },
};

const DEFAULT_PHOTO_URL = null; // Optional profile picture

// ---------- Helpers ----------
async function loadImageAsDataURL(url) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function drawSectionTitle(doc, text, x, y, color) {
  doc.setTextColor(color.r, color.g, color.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(text, x, y);
  doc.setDrawColor(color.r, color.g, color.b);
  doc.setLineWidth(0.5);
  doc.line(x, y + 1.2, x + 60, y + 1.2);
}

function drawBulletList(doc, bullets, x, y, maxWidth) {
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);
  doc.setFontSize(10);
  let cursor = y;
  bullets.forEach(b => {
    const lines = doc.splitTextToSize(b, maxWidth - 6);
    doc.circle(x + 1.5, cursor - 2.2, 0.7, "F");
    doc.text(lines, x + 5, cursor);
    cursor += (lines.length * 4.5) + 2;
  });
  return cursor;
}

function drawSkillBar(doc, label, value, x, y, width) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(240, 244, 248);
  doc.text(label, x, y);

  const barY = y + 2.2;
  const barH = 4;
  doc.setFillColor(28, 45, 75); // dark navy track
  doc.roundedRect(x, barY, width, barH, 1, 1, "F");

  const w = Math.max(0, Math.min(width, (value / 100) * width));
  doc.setFillColor(99, 102, 241); // indigo fill
  doc.roundedRect(x, barY, w, barH, 1, 1, "F");

  return barY + barH + 4;
}

function textWithLink(doc, label, url, x, y) {
  doc.setTextColor(220, 220, 220);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.textWithLink(label, x, y, { url });
}

// ---------- Main Generator ----------
async function generateCV(data, photoUrl) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Colors
  const NAVY = { r: 15, g: 23, b: 42 };
  const INDIGO = { r: 79, g: 70, b: 229 };
  const BLUE = { r: 30, g: 64, b: 175 };
  const TEXT = { r: 45, g: 45, b: 45 };

  // Layout
  const pageW = 210, pageH = 297;
  const margin = 14;
  const sidebarW = 70;
  const rightX = margin + sidebarW + 10;
  let leftY = margin + 12;
  let rightY = margin + 14;

  // Sidebar background
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(0, 0, margin + sidebarW, pageH, "F");

  // Header (name + title on right)
  doc.setFont("helvetica", "bold");
  doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
  doc.setFontSize(22);
  doc.text(data.name, rightX, rightY);
  rightY += 8;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);
  doc.setFontSize(12);
  doc.text(data.title, rightX, rightY);
  rightY += 12;

  // Optional profile photo
  const photoDataUrl = photoUrl ? await loadImageAsDataURL(photoUrl) : null;
  if (photoDataUrl) {
    const imgSize = 42;
    const imgX = margin + (sidebarW - imgSize) / 2;
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(1.2);
    doc.circle(imgX + imgSize / 2, leftY + imgSize / 2, imgSize / 2 + 2);
    doc.addImage(photoDataUrl, "JPEG", imgX, leftY, imgSize, imgSize, "", "FAST");
    leftY += imgSize + 12;
  }

  // Sidebar: Contact
  drawSectionTitle(doc, "Contact", margin + 6, leftY, INDIGO);
  leftY += 10;
  doc.setTextColor(230, 234, 240);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`📍 ${data.location}`, margin + 6, leftY); leftY += 6;
  doc.text(`✉ ${data.email}`, margin + 6, leftY); leftY += 6;
  doc.text(`☎ ${data.phone}`, margin + 6, leftY); leftY += 8;

  textWithLink(doc, "GitHub", data.github, margin + 6, leftY); leftY += 6;
  textWithLink(doc, "LinkedIn", data.linkedin, margin + 6, leftY); leftY += 6;
  if (data.website) { textWithLink(doc, "Portfolio", data.website, margin + 6, leftY); leftY += 10; }

  // Sidebar: Skills
  drawSectionTitle(doc, "Skills", margin + 6, leftY, INDIGO);
  leftY += 10;
  let skillsY = leftY;
  const barWidth = sidebarW - 20;
  data.skills.forEach(s => {
    skillsY = drawSkillBar(doc, s.name, s.level, margin + 6, skillsY, barWidth);
  });
  leftY = skillsY + 6;

  // Right: Summary
  drawSectionTitle(doc, "Professional Summary", rightX, rightY, BLUE);
  rightY += 8;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
  doc.setFontSize(11);
  const summaryLines = doc.splitTextToSize(data.summary, pageW - rightX - margin);
  doc.text(summaryLines, rightX, rightY);
  rightY += summaryLines.length * 5 + 8;

  // Right: Experience
  drawSectionTitle(doc, "Experience", rightX, rightY, BLUE);
  rightY += 8;
  data.experience.forEach(exp => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    doc.setFontSize(11.5);
    doc.text(`${exp.role} — ${exp.company}`, rightX, rightY);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(110, 110, 110);
    doc.setFontSize(10);
    doc.text(exp.period, rightX, rightY + 5);
    rightY += 9;
    rightY = drawBulletList(doc, exp.bullets, rightX, rightY, pageW - rightX - margin);
    rightY += 4;
  });

  // Right: Projects
  if (data.projects?.length) {
    drawSectionTitle(doc, "Projects", rightX, rightY, BLUE);
    rightY += 8;
    data.projects.forEach(p => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
      doc.setFontSize(11);
      doc.text(p.name, rightX, rightY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(p.detail, pageW - rightX - margin);
      doc.text(lines, rightX, rightY + 5);
      if (p.link) {
        doc.setTextColor(30, 64, 175);
        doc.textWithLink("View Project", rightX, rightY + 5 + (lines.length * 4.5) + 2, { url: p.link });
        rightY += (lines.length * 4.5) + 12;
      } else {
        rightY += (lines.length * 4.5) + 8;
      }
    });
  }

  // Right: Education
  drawSectionTitle(doc, "Education", rightX, rightY, BLUE);
  rightY += 8;
  data.education.forEach(ed => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    doc.setFontSize(11);
    doc.text(ed.program, rightX, rightY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    doc.setFontSize(10);
    doc.text(ed.school, rightX, rightY + 5);
    doc.text(ed.period, rightX, rightY + 10);
    let eduY = rightY + 16;
    if (ed.bullets?.length) {
      eduY = drawBulletList(doc, ed.bullets, rightX, eduY, pageW - rightX - margin);
    }
    rightY = eduY + 4;
  });

  // Right: Certifications
  if (data.certifications?.completed?.length || data.certifications?.target?.length) {
    drawSectionTitle(doc, "Certifications", rightX, rightY, BLUE);
    rightY += 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
    doc.setFontSize(10.5);

    if (data.certifications.completed?.length) {
      doc.text("✅ Completed / In Progress:", rightX, rightY);
      rightY += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      data.certifications.completed.forEach(cert => {
        const lines = doc.splitTextToSize(`• ${cert}`, pageW - rightX - margin);
        doc.text(lines, rightX, rightY);
        rightY += (lines.length * 5) + 2;
      });
      rightY += 4;
    }

    if (data.certifications.target?.length) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(TEXT.r, TEXT.g, TEXT.b);
      doc.text("🎯 Target Certifications:", rightX, rightY);
      rightY += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      data.certifications.target.forEach(cert => {
        const lines = doc.splitTextToSize(`• ${cert}`, pageW - rightX - margin);
        doc.text(lines, rightX, rightY);
        rightY += (lines.length * 5) + 2;
      });
    }
  }

  // Footer
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, pageH - 16, pageW - margin, pageH - 16);
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(`${data.name} • ${data.email} • ${data.phone}`, margin, pageH - 11);
  if (data.website) doc.text(`${data.website}`, margin, pageH - 6);

  // Save
  const safeName = data.name.replace(/\s+/g, "_");
  doc.save(`${safeName}_CV.pdf`);
}

// ---------- Wire up button ----------
document.getElementById("downloadCV").addEventListener("click", async () => {
  const inputUrl = document.getElementById("photoUrl")?.value?.trim();
  const photoUrl = inputUrl || DEFAULT_PHOTO_URL || null;
  await generateCV(CV_DATA, photoUrl);
});