# 📝 Blog Banner Editor - We Connect Soft Solutions

This component is part of our internal blog system. It allows admins to create stunning blog banners with rich text and call-to-action (CTA) buttons. This feature was proudly built by **Madhur**, during his internship at **We Connect Soft Solutions**.

---

## 🚀 Features

* 🎨 **Set Custom Background Color**
* 🖼️ **Upload and Display Background Image**
* 💡 **Toggle Image Visibility (Brightness Effect)**
* ✍️ **Rich Text Title Editor** using Tiptap (Bold, Italic, Underline, Strike, Code, Links, Text Color, Font Size)
* ➕ **Toggle Custom Button Visibility**
* 🧰 **Edit Button Styles**:

  * Set **text color**
  * Set **background color**
  * Toggle **bold** text
  * Set **CTA text**
  * Add a **custom link**
  * Align the button (left, center, right)
* 🧱 **Dynamic Layout Height** (Full, Mid, Half)
* 🖱️ **Interactive Sidebar for Controls** (Visibility, Color/Image Picker)
* 💡 **Live Preview with Transitions and Hover Effects**

---

## 🔗 Accessing the Feature

### 🛠️ Step 1: Add Route

```jsx
// In your main app routing file (e.g., App.jsx or routes.jsx):
import BlogEdit from './pages/BlogEdit';

<Route path="/edit-banner" element={<BlogEdit />} />
```

### 📍 Visit the Editor:

Open your browser and go to: `http://localhost:3000/edit-banner`

### Optional:

You can also add a nav link:

```jsx
<Link to="/edit-banner" className="btn">Edit Blog Banner</Link>
```

---

## 📦 Install Required Packages

Install Tiptap and its extensions:

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-underline \
            @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-link
```

Also include the custom extension:

* `FontSize.js` from `extensions/FontSize`

---

## 📂 File Structure

```
src/
├── components/
│   ├── TextEditor.jsx
│   ├── ButtonEditor.jsx
│
├── extensions/
│   └── FontSize.js
│
├── pages/
│   └── BlogEdit.jsx
```

---

## 🙌 Built with ❤️ by Madhur

> Intern @ We Connect Soft Solutions

Feel free to explore and improve this module for more powerful content editing and blog customization!
