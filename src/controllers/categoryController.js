
import Category from '../models/categoryModel.js';


export const categoryController = {

createCategory :  async (req, res) => {
    try {
        const { name, IconName, color } = req.body;
        console.log(req.body);
        if(!(name && IconName && color)){
            return res.status(400).json({message: 'All fields are required'})
        }
          const newCategory = new Category({
            name,
            IconName,
            color,
          });
          const savedCategory = await newCategory.save();
            res.status(201).json({
                message: 'Category created successfully',
                category: savedCategory,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
},

getCategories : async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},



updateCategory : async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = req.body.name;
        category.icon = req.body.icon;

        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
},

deleteCategory : async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.remove();
        res.status(200).json({ message: 'Category removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
}