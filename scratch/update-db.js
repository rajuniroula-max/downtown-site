import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Parse .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[0].split('=')[0].trim();
    let value = match[0].split('=').slice(1).join('=').trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Updating live database rows...");

  // 1. Delete other branches
  console.log("Cleaning other branch rows...");
  const { error: deleteErr } = await supabase
    .from('branches')
    .delete()
    .neq('name', 'Downtown Educational Consultancy — Head Office');
  if (deleteErr) console.error("Error clearing branches:", deleteErr);

  // Update or insert the single head office row
  const branchRow = {
    name: "Downtown Educational Consultancy — Head Office",
    address: "Dillibazar-30, Kathmandu 44600",
    phone: "+977-9841307624",
    telephone: "014500099",
    email: "info@downtown.edu.np",
    map_iframe: "https://www.google.com/maps?q=27.7054777,85.3258023&z=17&output=embed",
    order_index: 0
  };

  const { data: existingBranches } = await supabase
    .from('branches')
    .select('id');
  
  if (existingBranches && existingBranches.length > 0) {
    const { error: updateErr } = await supabase
      .from('branches')
      .update(branchRow)
      .eq('id', existingBranches[0].id);
    if (updateErr) console.error("Error updating branch:", updateErr);
    else console.log("Updated existing branch row successfully.");

    // Delete any duplicates
    if (existingBranches.length > 1) {
      const idsToDelete = existingBranches.slice(1).map(b => b.id);
      await supabase.from('branches').delete().in('id', idsToDelete);
    }
  } else {
    const { error: insertErr } = await supabase
      .from('branches')
      .insert(branchRow);
    if (insertErr) console.error("Error inserting branch:", insertErr);
    else console.log("Inserted head office branch successfully.");
  }

  // 2. Update site_settings 'contact_numbers'
  console.log("Updating public.site_settings contact_numbers...");
  const contactVal = {
    mobile: "+9779841307624",
    telephone: "014500099",
    email: "info@downtown.edu.np",
    whatsapp: "+9779841307624"
  };
  const { error: settingErr } = await supabase
    .from('site_settings')
    .upsert({ key: 'contact_numbers', value: contactVal });
  if (settingErr) console.error("Error updating contact_numbers:", settingErr);
  else console.log("Updated contact_numbers setting successfully.");

  // 3. Insert/Upsert site_settings 'social_links'
  console.log("Updating public.site_settings social_links...");
  const socialVal = {
    facebook: "https://www.facebook.com/share/1BH5RJdhKR/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/down_townedu?igsh=MWk2dHVjOThvajZqdQ==",
    tiktok: "https://www.tiktok.com/@downtownedu?_r=1&_t=ZS-97weHFVTLgf"
  };
  const { error: socialErr } = await supabase
    .from('site_settings')
    .upsert({ key: 'social_links', value: socialVal });
  if (socialErr) console.error("Error updating social_links:", socialErr);
  else console.log("Updated social_links setting successfully.");

  // 4. Query back to confirm
  console.log("\n--- VERIFYING WRITTEN DATA ---");
  const { data: finalBranches } = await supabase.from('branches').select('*');
  console.log("public.branches rows:", JSON.stringify(finalBranches, null, 2));

  const { data: finalSettings } = await supabase.from('site_settings').select('*');
  console.log("public.site_settings rows:", JSON.stringify(finalSettings, null, 2));

  console.log("\nDB Update complete!");
}

run();
