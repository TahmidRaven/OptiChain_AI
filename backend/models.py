from tortoise import fields
from tortoise.models import Model
from passlib.hash import bcrypt

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    email = fields.CharField(100, unique=True)
    password_hash = fields.CharField(128)

    def verify_password(self, password: str) -> bool:
        return bcrypt.verify(password, self.password_hash)
