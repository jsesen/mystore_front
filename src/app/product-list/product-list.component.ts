import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../products';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  products:Product[]=[];
  productForm:FormGroup;
  showAdd: boolean;
  showEdit: boolean;

  constructor(private productService:ProductService,private fb:FormBuilder){
    this.productForm = this.fb.group({
      _id:['',Validators.required],
      name:['',Validators.required],
      price:[0,Validators.required],
      description:['']
    })
    this.showAdd = true;
    this.showEdit = false;        
  }

  ngOnInit(){
    this.getProducts();
  }

  private getProducts():void{
    this.productService.getProducts().subscribe(res=>this.products = res);
  }

  
  add():void{

    const {name,price,description} = this.productForm.getRawValue();

    this.productForm.reset();
    
    this.productService.addNewProduct(name,price,description).subscribe(result=>{
      
      if(result){
        this.getProducts();
      }
    })

  }

  deleteProduct(index:number):void{
    this.productService.deleteProduct(this.products[index]._id).subscribe(result=>{

      if(result){
        this.getProducts();
      }
    })
  }

  editProduct(index:number):void{
    this.showAdd = false;
    this.showEdit = true;
    this.productForm.patchValue({'_id': this.products[index]._id});
    this.productForm.patchValue({'name': this.products[index].name});
    this.productForm.patchValue({'description': this.products[index].description, 'price': this.products[index].price});

    console.log('Form _id is: ', this.productForm.get('_id')!.value);
    console.log('Form values is: ', this.productForm.value);
   
    
  }

  modify():void{
    this.showAdd = true;
    this.showEdit = false;

    const {_id, name,price,description} = this.productForm.getRawValue();    

    this.productForm.reset();
    
    this.productService.modifyProduct(_id, name,price,description).subscribe(result=>{
      
      if(result){
        this.getProducts();
      }
    })

  }

}
