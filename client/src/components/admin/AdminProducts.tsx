import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/stores/productStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ProductForm } from "./ProductForm";

const AdminProducts = () => {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('100');

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setName('');
    setPrice('');
    setOriginalPrice('');
    setImage('');
    setDescription('');
    setCategory('');
    setStock('100');
    setSelectedProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      image,
      description,
      category,
      rating: 4.5,
      reviews: 0,
      stock: parseInt(stock)
    };

    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData);
      toast({ title: "Product updated successfully" });
      setIsEditDialogOpen(false);
    } else {
      addProduct(productData);
      toast({ title: "Product added successfully" });
      setIsAddDialogOpen(false);
    }
    resetForm();
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setOriginalPrice(product.originalPrice?.toString() || '');
    setImage(product.image);
    setDescription(product.description);
    setCategory(product.category || '');
    setStock(product.stock?.toString() || '100');
    setIsEditDialogOpen(true);
  };

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
    toast({ title: "Product deleted successfully" });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Products</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new honey product to your store</DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleSubmit}
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              originalPrice={originalPrice}
              setOriginalPrice={setOriginalPrice}
              image={image}
              setImage={setImage}
              description={description}
              setDescription={setDescription}
              category={category}
              setCategory={setCategory}
              stock={stock}
              setStock={setStock}
              selectedProduct={selectedProduct}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">${product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {product.category && <Badge variant="outline">{product.category}</Badge>}
                </TableCell>
                <TableCell>
                  <Badge className={product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          <ProductForm
            onSubmit={handleSubmit}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            originalPrice={originalPrice}
            setOriginalPrice={setOriginalPrice}
            image={image}
            setImage={setImage}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            stock={stock}
            setStock={setStock}
            selectedProduct={selectedProduct}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
