-- Cloudflare D1 Database Schema for mitrokit-ventures
-- Run this with: npx wrangler d1 execute mitrokit-ventures --local --file=./database-schema.sql

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'USER',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    tech_stack TEXT, -- JSON array stored as text
    category TEXT,
    year INTEGER,
    featured INTEGER DEFAULT 0,
    live_url TEXT,
    github_url TEXT,
    user_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    tags TEXT, -- JSON array stored as text
    published INTEGER DEFAULT 0,
    reading_time INTEGER DEFAULT 5,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    user_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    email TEXT NOT NULL,
    post_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT,
    content TEXT NOT NULL,
    avatar TEXT,
    rating INTEGER DEFAULT 5,
    featured INTEGER DEFAULT 0,
    user_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    features TEXT, -- JSON array stored as text
    display_order INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Messages table (contact form)
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    archived INTEGER DEFAULT 0,
    user_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Subscribers table (newsletter)
CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    active INTEGER DEFAULT 1,
    subscribed_at TEXT DEFAULT (datetime('now')),
    unsubscribed_at TEXT
);

-- Audit Logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    details TEXT, -- JSON object stored as text
    ip_address TEXT,
    user_agent TEXT,
    user_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Brand Assets table
CREATE TABLE IF NOT EXISTS brand_assets (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL, -- logo, favicon, og-image, etc.
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Insert default admin user
-- Password: admin123 (use bcrypt in production)
INSERT OR IGNORE INTO users (id, email, password_hash, name, role, created_at)
VALUES ('1', 'admin@mitrokit.com', 'admin123', 'Mwaki Denis', 'ADMIN', datetime('now'));

-- Insert default services
INSERT OR IGNORE INTO services (id, name, description, icon, features, display_order, active)
VALUES 
    ('1', 'Full-Stack Development', 'End-to-end web application development using modern technologies like React, Next.js, Node.js, and more.', 'code', '["Web Applications","API Development","Database Design","Performance Optimization"]', 1, 1),
    ('2', 'Cloud Solutions', 'Expert cloud infrastructure setup and management on AWS, Cloudflare, Vercel, and other platforms.', 'cloud', '["Cloud Architecture","Serverless Functions","CDN Setup","Cloud Security"]', 2, 1),
    ('3', 'API Development', 'RESTful and GraphQL API design and implementation for robust backend systems.', 'api', '["REST APIs","GraphQL","Authentication","API Documentation"]', 3, 1),
    ('4', 'Digital Marketing', 'Comprehensive digital marketing strategies to grow your online presence.', 'marketing', '["SEO","Social Media","Email Marketing","Analytics"]', 4, 1),
    ('5', 'Graphics Design', 'Professional graphic design services for branding and marketing materials.', 'palette', '["Logo Design","Brand Identity","Marketing Materials","UI/UX Design"]', 5, 1),
    ('6', 'Cyber Security', 'Security assessments and implementations to protect your digital assets.', 'shield', '["Security Audit","Vulnerability Assessment","Penetration Testing","Security Training"]', 6, 1);

-- Insert sample FAQs
INSERT OR IGNORE INTO faqs (id, question, answer, category, display_order, active)
VALUES 
    ('1', 'What services do you offer?', 'We offer Full-Stack Development, Cloud Solutions, API Development, Digital Marketing, Graphics Design, and Cyber Security services.', 'General', 1, 1),
    ('2', 'How can I contact you?', 'You can contact us through the contact form on our website, email us at contact@mitrokit.com, or call us at +254 798 750 585.', 'General', 2, 1),
    ('3', 'What is your turnaround time?', 'Turnaround time depends on the project scope. Small projects typically take 1-2 weeks, while larger projects may take 1-3 months.', 'Pricing', 3, 1),
    ('4', 'Do you offer support after project completion?', 'Yes, we offer ongoing support and maintenance packages for all our projects.', 'General', 4, 1);
