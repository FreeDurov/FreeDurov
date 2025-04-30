"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { products } from "@/lib/products"
import { Switch } from "@/components/ui/switch"
import { Edit, Trash, ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function AdminClient() {
  // In a real app, products would be fetched from a database
  const [productsList, setProductsList] = useState(products)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "lifestyle",
    image: "/placeholder.svg",
    colors: [],
    sizes: [],
    featured: false,
    new: false,
  })

  const categories = ["lifestyle", "running", "basketball", "training", "soccer", "skateboarding"]

  const handleAddProduct = () => {
    const id = (productsList.length + 1).toString()
    const product = { ...newProduct, id }
    setProductsList([...productsList, product])
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      category: "lifestyle",
      image: "/placeholder.svg",
      colors: [],
      sizes: [],
      featured: false,
      new: false,
    })
  }

  const handleUpdateProduct = () => {
    const updatedProducts = productsList.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
    setProductsList(updatedProducts)
    setSelectedProduct(null)
    setEditMode(false)
  }

  const handleDeleteProduct = (id) => {
    const updatedProducts = productsList.filter((p) => p.id !== id)
    setProductsList(updatedProducts)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setEditMode(true)
  }

  const handleColorChange = (e, product) => {
    const color = e.target.value
    if (!e.target.value.trim()) return

    if (editMode) {
      if (!selectedProduct.colors.includes(color)) {
        setSelectedProduct({
          ...selectedProduct,
          colors: [...selectedProduct.colors, color],
        })
      }
    } else {
      if (!newProduct.colors.includes(color)) {
        setNewProduct({
          ...newProduct,
          colors: [...newProduct.colors, color],
        })
      }
    }
    e.target.value = ""
  }

  const handleSizeChange = (e, product) => {
    const size = e.target.value
    if (!e.target.value.trim()) return

    if (editMode) {
      if (!selectedProduct.sizes.includes(size)) {
        setSelectedProduct({
          ...selectedProduct,
          sizes: [...selectedProduct.sizes, size],
        })
      }
    } else {
      if (!newProduct.sizes.includes(size)) {
        setNewProduct({
          ...newProduct,
          sizes: [...newProduct.sizes, size],
        })
      }
    }
    e.target.value = ""
  }

  const removeColor = (color, isEdit) => {
    if (isEdit) {
      setSelectedProduct({
        ...selectedProduct,
        colors: selectedProduct.colors.filter((c) => c !== color),
      })
    } else {
      setNewProduct({
        ...newProduct,
        colors: newProduct.colors.filter((c) => c !== color),
      })
    }
  }

  const removeSize = (size, isEdit) => {
    if (isEdit) {
      setSelectedProduct({
        ...selectedProduct,
        sizes: selectedProduct.sizes.filter((s) => s !== size),
      })
    } else {
      setNewProduct({
        ...newProduct,
        sizes: newProduct.sizes.filter((s) => s !== size),
      })
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Products List</CardTitle>
                  <CardDescription>Manage your products inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productsList.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" onClick={() => handleEditProduct(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{editMode ? "Edit Product" : "Add New Product"}</CardTitle>
                  <CardDescription>
                    {editMode ? "Update product details" : "Create a new product listing"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      value={editMode ? selectedProduct?.name : newProduct.name}
                      onChange={(e) =>
                        editMode
                          ? setSelectedProduct({ ...selectedProduct, name: e.target.value })
                          : setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea
                      id="product-description"
                      value={editMode ? selectedProduct?.description : newProduct.description}
                      onChange={(e) =>
                        editMode
                          ? setSelectedProduct({ ...selectedProduct, description: e.target.value })
                          : setNewProduct({ ...newProduct, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-price">Price ($)</Label>
                      <Input
                        id="product-price"
                        type="number"
                        value={editMode ? selectedProduct?.price : newProduct.price}
                        onChange={(e) =>
                          editMode
                            ? setSelectedProduct({ ...selectedProduct, price: Number.parseFloat(e.target.value) })
                            : setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-category">Category</Label>
                      <Select
                        value={editMode ? selectedProduct?.category : newProduct.category}
                        onValueChange={(value) =>
                          editMode
                            ? setSelectedProduct({ ...selectedProduct, category: value })
                            : setNewProduct({ ...newProduct, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-image">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="product-image"
                        value={editMode ? selectedProduct?.image : newProduct.image}
                        onChange={(e) =>
                          editMode
                            ? setSelectedProduct({ ...selectedProduct, image: e.target.value })
                            : setNewProduct({ ...newProduct, image: e.target.value })
                        }
                      />
                      <Button variant="outline" size="icon">
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-colors">Colors</Label>
                    <div className="flex gap-2">
                      <Input
                        id="product-colors"
                        placeholder="Add color and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleColorChange(e, editMode ? selectedProduct : newProduct)
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editMode ? selectedProduct?.colors : newProduct.colors)?.map((color) => (
                        <Badge key={color} variant="secondary" className="flex gap-1 items-center">
                          {color}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 hover:bg-transparent"
                            onClick={() => removeColor(color, editMode)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-sizes">Sizes</Label>
                    <div className="flex gap-2">
                      <Input
                        id="product-sizes"
                        placeholder="Add size and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSizeChange(e, editMode ? selectedProduct : newProduct)
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(editMode ? selectedProduct?.sizes : newProduct.sizes)?.map((size) => (
                        <Badge key={size} variant="secondary" className="flex gap-1 items-center">
                          {size}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1 hover:bg-transparent"
                            onClick={() => removeSize(size, editMode)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={editMode ? selectedProduct?.featured : newProduct.featured}
                      onCheckedChange={(checked) =>
                        editMode
                          ? setSelectedProduct({ ...selectedProduct, featured: checked })
                          : setNewProduct({ ...newProduct, featured: checked })
                      }
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="new"
                      checked={editMode ? selectedProduct?.new : newProduct.new}
                      onCheckedChange={(checked) =>
                        editMode
                          ? setSelectedProduct({ ...selectedProduct, new: checked })
                          : setNewProduct({ ...newProduct, new: checked })
                      }
                    />
                    <Label htmlFor="new">New Arrival</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {editMode && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedProduct(null)
                        setEditMode(false)
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button onClick={editMode ? handleUpdateProduct : handleAddProduct}>
                    {editMode ? "Update Product" : "Add Product"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This tab would contain order management functionality in a complete application.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Manage your customer database</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This tab would contain customer management functionality in a complete application.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminClient
