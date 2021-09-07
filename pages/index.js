import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({ name: "", card_type: "" });
  const { name, card_type } = card;
  useEffect(() => {
    fetchCards();
  }, []);
  async function fetchCards() {
    const { data } = await supabase.from("Cards").select();
    setCards(data);
    console.log("data: ", data);
  }

  async function createCard() {
    await supabase.from("Cards").insert([{ name, card_type }]).single();
    setCard({ name: "", card_type: "" });
    fetchCards();
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
          />
          <input
            placeholder="Card Type"
            value={card_type}
            onChange={(e) => setCard({ ...card, card_type: e.target.value })}
          />
          <button onClick={createCard}>Create Card</button>
          {cards.map((card) => {
            <div key={card.id}>
              <h3>{card.name}</h3>
              <p>{card.card_type}</p>
            </div>;
          })}
        </div>
      </main>
    </div>
  );
}
