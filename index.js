import express from "express";

const app = express();

const PORT = 3000;

const MOCK_RESPONSES = [
  "I love you, and it freaks me out.",
  "I kinda wish we could be more than just friends. I think we'd be great together.",
  "I miss you so much, but I’m scared to admit how much it still hurts.",
  "Honestly, you’ve hurt me a lot, and I don’t think I’ve forgiven you for it.",
  "You make me feel alive in ways I didn’t even know were possible.",
  "Sometimes, I feel like you don’t really appreciate me, and it sucks.",
  "I’ve been keeping my feelings to myself because I didn’t want to mess things up between us.",
  "I’m scared that if I tell you how I really feel, you’ll never see me the same way.",
  "I’ve probably never told you how much I look up to you.",
  "I just wish, for once, you’d take me seriously instead of acting like everything’s a joke.",
  "I’m so proud of you, but sometimes I feel like you don’t really care about me anymore.",
  "You’ve always been there for me, and I don’t think I’ve thanked you enough for that.",
  "I’ve wanted to ask you out so many times, but I’m scared to ruin our friendship.",
  "You make me feel like my feelings don’t matter, and I hate it.",
  "You’re honestly one of the coolest people I know, and I feel lucky to even know you.",
  "I’m scared of losing you, but sometimes I wonder if we’re actually good for each other.",
  "I want to tell you how much I care, but I’m worried you’d push me away.",
  "You’ve been my rock through so much, and I don’t think I’ve said thank you enough.",
  "You can be really selfish sometimes, and I’m tired of pretending that’s okay.",
  "I don’t feel like you really see me anymore, and it hurts.",
  "You’ve changed my life—for better and worse—and I just needed to say that.",
  "I feel like you don’t listen to me, and it’s honestly exhausting.",
  "I don’t trust you the way I used to, and I don’t know if I ever will again.",
  "I’ve wanted to tell you for ages—you’re the one person I can’t imagine my life without.",
  "I’m scared to say this, but I need to—I’m in love with you, and I don’t think you feel the same.",
];

app.use(express.static("public"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});

app.post("/submit", (req, res) => {
  const { input } = req.body;
  // TODO: store in DB;
  res.send([...MOCK_RESPONSES, input]);
});
