import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IPost } from 'src/models/interfaces';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent {
  formData: IPost | null = null;

  constructor(
    public dialogRef: MatDialogRef<PostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: IPost, isEditable: boolean }
  ) { }

  ngOnInit() {
    // Initialize the formData with a deep copy of the post data
    this.formData = { ...this.data.post };
  }

  onSave() {
    // Close the dialog and pass the formData back to the parent component
    this.dialogRef.close(this.formData);
  }

  onCancel() {
    // Close the dialog with no data passed back to the parent component
    this.dialogRef.close(null);
  }

}