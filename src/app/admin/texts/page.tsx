"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminTextsPage() {
  const [texts, setTexts] = useState({
    hero_headline: "", hero_subheadline: "", about_bio: "", teaching_philosophy: "",
    profile_image_url: "", hero_bg_url: ""
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadTexts() {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) {
        setTexts({
          hero_headline: data.hero_headline || "", hero_subheadline: data.hero_subheadline || "",
          about_bio: data.about_bio || "", teaching_philosophy: data.teaching_philosophy || "",
          profile_image_url: data.profile_image_url || "/images/profile.jpg",
          hero_bg_url: data.hero_bg_url || ""
        });
      }
    }
    loadTexts();
  }, []);

  // Handle Image Upload to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to 'images' bucket
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      // Update state
      setTexts({ ...texts, [field]: data.publicUrl });
      alert("Image uploaded! Don't forget to click Save All Changes at the bottom.");

    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('site_settings').update(texts).eq('id', 1);
    alert("✅ All changes saved! The website has been updated.");
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-extrabold text-deepBlue mb-2 dark:text-white">Global CMS & Images</h1>
      
      <div className="space-y-8 mt-8">
        
        {/* IMAGE UPLOADERS */}
        <div className="p-6 bg-neutralLight rounded-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <h2 className="text-xl font-bold text-deepBlue mb-4 dark:text-white">Website Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold mb-2 text-sm text-gray-600 dark:text-gray-400">Profile Portrait Image</label>
              {texts.profile_image_url && <img src={texts.profile_image_url} alt="Profile" className="w-24 h-24 object-cover rounded-full mb-3" />}
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile_image_url')} className="text-sm" disabled={uploading} />
            </div>
            <div>
              <label className="block font-bold mb-2 text-sm text-gray-600 dark:text-gray-400">Hero Background (Optional)</label>
              {texts.hero_bg_url && <img src={texts.hero_bg_url} alt="Hero" className="w-32 h-20 object-cover rounded-lg mb-3" />}
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero_bg_url')} className="text-sm" disabled={uploading} />
            </div>
          </div>
        </div>

        {/* TEXTS */}
        <div>
          <label className="block font-bold text-deepBlue mb-2 dark:text-white">Homepage Hero Headline</label>
          <input type="text" value={texts.hero_headline} onChange={e => setTexts({...texts, hero_headline: e.target.value})} className="w-full p-4 border rounded-xl dark:bg-gray-900" />
        </div>
        <div>
          <label className="block font-bold text-deepBlue mb-2 dark:text-white">Homepage Biography</label>
          <textarea rows={4} value={texts.about_bio} onChange={e => setTexts({...texts, about_bio: e.target.value})} className="w-full p-4 border rounded-xl dark:bg-gray-900" />
        </div>

        <button onClick={handleSave} disabled={saving || uploading} className="w-full bg-deepBlue text-white font-bold py-4 rounded-xl hover:bg-aiPurple transition-colors uppercase tracking-wide">
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}