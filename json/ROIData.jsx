const roiData = {
    header: "💰 ROI (Return on Investment)",
    categories: [
        {
            title: "By Sport",
            items: [
                { text: "NBA: +12.5%", emoji: "🟢", color: "#00C853" },
                { text: "NFL: +8.9%", emoji: "🟢", color: "#00C853" },
                { text: "MLB: +15.3%", emoji: "🟢", color: "#00C853" },
                { text: "Soccer: -4.2%", emoji: "🔴", color: "#FF6E40" }
            ]
        },
        {
            title: "By Bet Type",
            items: [
                { text: "Spreads: +18.2%", emoji: "✅", color: "#00C853" },
                { text: "Moneyline: +7.5%", emoji: "✅", color: "#00C853" },
                { text: "Over/Under: +22.1%", emoji: "🚀", color: "#00C853" },
                { text: "Parlays: -10.5%", emoji: "⚠️", color: "#FF6E40" }
            ]
        }
    ]
};

export default roiData;
