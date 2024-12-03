import bcrypt from "bcryptjs";

class Bcrypt {
  private salt: number = 10;
  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = bcrypt.hash(password, this.salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  async compare(reqPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      const isTrue = bcrypt.compare(reqPassword, hashedPassword);
      return isTrue;
    } catch (error) {
      throw error;
    }
  }
}

export { Bcrypt };
