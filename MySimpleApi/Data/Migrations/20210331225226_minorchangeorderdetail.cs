using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class minorchangeorderdetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Stores_StoreID",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_StoreID",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "StoreID",
                table: "OrderDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StoreID",
                table: "OrderDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_StoreID",
                table: "OrderDetails",
                column: "StoreID");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Stores_StoreID",
                table: "OrderDetails",
                column: "StoreID",
                principalTable: "Stores",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
