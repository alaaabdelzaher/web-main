import { supabase } from '../lib/supabase';

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Database connection successful!');
    console.log('Blog posts count:', data);
    
    // Test site settings
    const { data: settings, error: settingsError } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1);
    
    if (settingsError) {
      console.error('Site settings error:', settingsError);
    } else {
      console.log('Site settings accessible:', settings?.length > 0);
    }
    
    return { success: true, message: 'Database connection working properly' };
  } catch (error) {
    console.error('Connection test failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Initialize database tables if they don't exist
export const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // Check if tables exist by trying to query them
    const tables = ['blog_posts', 'site_settings', 'contact_messages', 'content_sections'];
    
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.error(`Table ${table} not accessible:`, error.message);
      } else {
        console.log(`Table ${table} is accessible`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Database initialization failed:', error);
    return { success: false, error };
  }
};