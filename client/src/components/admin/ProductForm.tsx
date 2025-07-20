import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ProductFormProps {
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  originalPrice: string;
  setOriginalPrice: (val: string) => void;
  images: string[];
  setImages: (val: string[]) => void;
  description: string;
  setDescription: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  stock: string;
  setStock: (val: string) => void;
  selectedProduct: any;
}

export const ProductForm = ({
  onSubmit,
  name,
  setName,
  price,
  setPrice,
  originalPrice,
  setOriginalPrice,
  images,
  setImages,
  description,
  setDescription,
  category,
  setCategory,
  stock,
  setStock,
  selectedProduct,
}: ProductFormProps) => {
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="originalPrice">Original Price (Optional)</Label>
          <Input id="originalPrice" type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="raw-honey">Raw Honey</SelectItem>
              <SelectItem value="flavored-honey">Flavored Honey</SelectItem>
              <SelectItem value="honey-products">Honey Products</SelectItem>
              <SelectItem value="organic-honey">Organic Honey</SelectItem>
              <SelectItem value="gift-sets">Gift Sets</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label>Images (Max 5 URLs)</Label>
        {images.map((image, index) => (
          <Input
            key={index}
            value={image}
            onChange={(e) => handleImageChange(index, e.target.value)}
            placeholder={`Image ${index + 1} URL`}
            required={index === 0}
          />
        ))}
        {images.length < 5 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setImages([...images, ""])}
            className="w-full"
          >
            Add Image Field
          </Button>
        )}
      </div>

      <Button type="submit" className="w-full">
        {selectedProduct ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
};
