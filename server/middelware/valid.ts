import { Request, Response, NextFunction } from 'express'

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { name, account, password } = req.body

  const err = [];

  if (!name) {
    err.push("Vui lòng nhập tên của bạn")
  } else if (name.length > 30) {
    err.push("Độ dài không quá 30 ký tự")
  }

  if (!account) {
    err.push("Vui lòng nhập email hoặc số điện thoại")
  } else if (!validPhone(account) && !validateEmail(account)) {
    err.push("Định dạng email hoặc số điện thoại không chính xác")
  }

  if (password.length < 6) {
    err.push("Mật khẩu phải có ít nhất 8 ký tự")
  }

  if (err.length > 0) return res.status(400).json({ msg: err })
  next();
}

export const validBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, desc, img, tag } = req.body

  const err = [];

  if (!title) {
    err.push("Vui lòng nhập tiêu đề bài đăng")
  } else if (title.length > 150) {
    err.push("Độ dài không quá 150 ký tự")
  }

  if (!content) {
    err.push("Vui lòng nhập nội dung bài đăng")
  } else if (content.length > 20000) {
    err.push("Độ dài không quá 20000 ký tự")
  }
  if (!img) {
    err.push("Vui lòng chọn ảnh đại diện cho bài đăng")
  }

  if(tag.length < 4){
    err.push("Chọn ít nhất 4 thẻ tag")
  }


  if (err.length > 0) return res.status(400).json({ msg: err })
  next();
}

export const validTag = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, moderators, guidelines, abount } = req.body;
  const err = [];
  if (!name) {
    err.push("Vui lòng nhập tiêu đề bài đăng")
  } else if (name.length > 20) {
    err.push("Độ dài không quá 20 ký tự")
  }

  if (description.length > 1000) {
    err.push("Độ dài không quá 300 ký tự")
  }
  if (abount.length > 1000) {
    err.push("Độ dài không quá 300 ký tự")
  }

  if(moderators.length === ""){
    err.push("Chọn ít nhất một Người quản trị")
  }
  if (err.length > 0) return res.status(400).json({ msg: err })
  next();
}

export function validPhone(phone: string) {
  const re = /^[+]/g
  return re.test(phone)
}

export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validUpdateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, story, location, web_url, learning, work, education } =
    req.body;
  const err = [];
  if (!name) {
    err.push("Tên người dùng không được trống");
  } else if (name.length > 20) {
    err.push("Độ dài tên không quá 30 ký tự");
  }

  if (story) {
    if (story.length > 200) {
      err.push("Độ dài tiểu sử không quá 200 ký tự");
    }
  }

  if (location) {
    if (location.length > 50) {
      err.push("Địa chỉ không quá 50 ký tự");
    }
  }

  if (web_url) {
    if (web_url.length > 50) {
      err.push("URL website không quá 50 ký tự");
    }
  }

  if (learning) {
    if (learning.length > 100) {
      err.push("Học vấn không quá 100 ký tự");
    }
  }

  if (work) {
    if (work.length > 100) {
      err.push("Công việc không quá 100 ký tự");
    }
  }

  if (education) {
    if (education.length > 100) {
      err.push("Giáo dục không quá 100 ký tự");
    }
  }

  // if (!avatar) {
  //   err.push("Vui lòng chọn ảnh đại diện");
  // }

  if (err.length > 0) return res.status(400).json({ msg: err });
  next();
};

export const validUpdateProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  const err = [];

  if (!avatar) {
    err.push("error 500 server");
  }

  if (err.length > 0) return res.status(400).json({ msg: err });
  next();
};
export const validUpdateProfileImageCover = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { coverimage } = req.body;
  const err = [];

  if (!coverimage) {
    err.push("Vui lòng chọn ảnh bìa");
  }

  if (err.length > 0) return res.status(400).json({ msg: err });
  next();
};
