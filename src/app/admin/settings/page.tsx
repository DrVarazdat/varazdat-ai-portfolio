"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [colors, setColors] = useState({ primary: "#0F172A", secondary: "#6D28D9", accent: "#06B6D4" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadColors() {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) {
        setColors({ primary: data.primary_color, secondary: data.secondary_color, accent: data.accent_color });
      }
    }
    loadColors();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('site_settings')
      .update({ primary_color: colors.primary, secondary_color: colors.secondary, accent_color: colors.accent })
      .eq('id', 1);
      
    if (error) alert("Error saving colors: " + error.message);
    else alert("Colors Saved! Refresh your website to see the changes.");
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-deepBlue mb-2">Theme Editor</h1>
      <p className="text-gray-500 mb-8">Type a HEX code or use the color picker.</p>
      
      <div className="space-y-8">
        {/* Primary Color */}
        <div>
          <label className="block font-bold text-deepBlue mb-2">Primary Color (Deep Blue default)</label>
          <div className="flex items-center gap-4">
            <input type="color" value={colors.primary} onChange={e => setColors({...colors, primary: e.target.value})} className="w-16 h-16 rounded-xl cursor-pointer border-0 p-0" />
            <input type="text" value={colors.primary} onChange={e => setColors({...colors, primary: e.target.value})} className="border border-gray-300 p-3 rounded-lg text-neutralDark font-mono w-32 focus:ring-2 focus:ring-aiPurple focus:outline-none" />
          </div>
        </div>

        {/* Secondary Color */}
        <div>
          <label className="block font-bold text-deepBlue mb-2">Secondary Color (Purple default)</label>
          <div className="flex items-center gap-4">
            <input type="color" value={colors.secondary} onChange={e => setColors({...colors, secondary: e.target.value})} className="w-16 h-16 rounded-xl cursor-pointer border-0 p-0" />
            <input type="text" value={colors.secondary} onChange={e => setColors({...colors, secondary: e.target.value})} className="border border-gray-300 p-3 rounded-lg text-neutralDark font-mono w-32 focus:ring-2 focus:ring-aiPurple focus:outline-none" />
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="block font-bold text-deepBlue mb-2">Accent Color (Cyan default)</label>
          <div className="flex items-center gap-4">
            <input type="color" value={colors.accent} onChange={e => setColors({...colors, accent: e.target.value})} className="w-16 h-16 rounded-xl cursor-pointer border-0 p-0" />
            <input type="text" value={colors.accent} onChange={e => setColors({...colors, accent: e.target.value})} className="border border-gray-300 p-3 rounded-lg text-neutralDark font-mono w-32 focus:ring-2 focus:ring-aiPurple focus:outline-none" />
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full bg-deepBlue text-white font-bold py-4 rounded-xl hover:bg-aiPurple transition-colors mt-4 uppercase tracking-wide">
          {saving ? "Saving to Database..." : "Save Global Colors"}
        </button>
      </div>
    </div>
  );
}